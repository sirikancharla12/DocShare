import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const createTransfer = async (req, res) => {
  try {
    const {
      title,
      message,
      transferType,
      accessType,
      password,
      expiryDays,
      recipients,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded " });
    }

    const expiresAt = new Date(
      Date.now() + Number(expiryDays) * 24 * 60 * 60 * 1000
    );

    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const linkSlug = uuidv4().slice(0, 8);

    const uploadedFiles = [];

    for (let file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "wetransfer_uploads",
      });

      uploadedFiles.push({
        fileUrl: result.secure_url,
        publicId: result.public_id,
        fileName: file.originalname,
        fileSize: file.size,
      });
    }

    const transfer = await prisma.transfer.create({
      data: {
        senderId: req.userId,

        title,
        message,

        transferType,
        accessType,

        linkSlug,
        passwordHash,
        expiresAt,

        files: {
          create: uploadedFiles,
        },

      }
    });

    if (transferType === "EMAIL" && recipients) {
      const emailList = JSON.parse(recipients);

      for (let email of emailList) {
        await prisma.transferRecipient.create({
          data: {
            email: email,
            transferId: transfer.id,
          },
        });
      }
    }

    const fullTransfer = await prisma.transfer.findUnique({
      where: { id: transfer.id },
      include: {
        files: true,
        recipients: true,
      },
    });

    res.json({
      msg: "Transfer created successfully ",
      shareLink: `${process.env.FRONTEND_URL}/t/${transfer.linkSlug}`,

      transfer: {
        title: fullTransfer.title,
        expiresAt: fullTransfer.expiresAt,

        files: fullTransfer.files.map((file) => ({
          id: file.id,
          fileName: file.fileName,
          fileSize: file.fileSize,

          downloadUrl: `${process.env.BASE_URL}/api/files/download/${file.id}`,

          previewUrl: `${process.env.BASE_URL}/api/files/preview/${file.id}`,
        })),
      },
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTransferBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const transfer = await prisma.transfer.findUnique({
      where: { linkSlug: slug },
      include: {
        files: true,
        sender: true
      },
    });

    if (!transfer) {
      return res.status(404).json({ msg: "Transfer not found " });
    }

    if (new Date() > transfer.expiresAt) {
      return res.status(410).json({ msg: "Link expired " });
    }


    if (transfer.passwordHash) {
      return res.json({
        msg: "Password required ",
        passwordRequired: true,
      });
    }

    if (transfer.accessType === "RESTRICTED") {
      return res.json({
        msg: "Recipient email required ",
        emailRequired: true,
      });
    }

    res.json({
      msg: "Accessed successfully ",

      transfer: {
        title: transfer.title,
        message: transfer.message,
        expiresAt: transfer.expiresAt,

        files: transfer.files.map((file) => ({
          id: file.id,
          fileName: file.fileName,
          fileSize: file.fileSize,

          previewUrl: `${process.env.BASE_URL}/api/files/preview/${file.id}`,
          downloadUrl: `${process.env.BASE_URL}/api/files/download/${file.id}`,
        })),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const accessTransfer = async (req, res) => {
  try {
    const { slug } = req.params;
    const { email, password } = req.body;

    const transfer = await prisma.transfer.findUnique({
      where: { linkSlug: slug },
      include: {
        files: true,
        recipients: true,
      },
    });

    if (!transfer) {
      return res.status(404).json({ msg: "Transfer not found " });
    }

    if (new Date() > transfer.expiresAt) {
      return res.status(410).json({ msg: "Link expired " });
    }

    if (
      transfer.transferType === "EMAIL" &&
      transfer.accessType === "RESTRICTED"
    ) {
      const allowedEmails = transfer.recipients.map((r) => r.email);

      if (!email || !allowedEmails.includes(email)) {
        return res.status(403).json({
          msg: "Access denied ,wrong email",
        });
      }
    }


    if (transfer.passwordHash) {
      if (!password) {
        return res.status(401).json({ msg: "Password required " });
      }

      const ok = await bcrypt.compare(password, transfer.passwordHash);

      if (!ok) {
        return res.status(401).json({ msg: "Invalid password " });
      }
    }

    return res.json({
      msg: "Access granted",

      transfer: {
        title: transfer.title,
        expiresAt: transfer.expiresAt,

        files: transfer.files.map((file) => ({
          id: file.id,
          fileName: file.fileName,
          fileSize: file.fileSize,

          previewUrl: `${process.env.BASE_URL}/api/files/preview/${file.id}`,
          downloadUrl: `${process.env.BASE_URL}/api/files/download/${file.id}`,
        })),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

