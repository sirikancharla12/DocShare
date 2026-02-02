import prisma from "../config/prisma.js";

export const downloadFile = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.fileId },
    include: { transfer: true },
  });

  if (!file) return res.status(404).send("File not found");

  if (new Date() > file.transfer.expiresAt) {
    return res.status(410).send("Link expired ");
  }

  return res.redirect(file.fileUrl);
};

export const previewFile = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.fileId },
    include: { transfer: true },
  });

  if (!file) return res.status(404).send("File not found");

  if (new Date() > file.transfer.expiresAt) {
    return res.status(410).send("Expired ");
  }

  return res.redirect(file.fileUrl);
};

