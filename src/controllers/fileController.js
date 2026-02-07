import prisma from "../config/prisma.js";
import axios from "axios";

export const downloadFile = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.fileId },
    include: { transfer: true },
  });

  if (!file) return res.status(404).send("File not found");

  if (new Date() > file.transfer.expiresAt) {
    return res.status(410).send("Link expired ");
  }

  //backend gets file data in chunks and sends it to client
  const response=await axios.get(file.fileUrl,{
    responseType:"stream"
  })


  //tells browser to download the file instead of displaying it as a webpage
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${file.fileName}"`
  )

  //pipe connects all the chunks and sends to client without loading everything in memory
  response.data.pipe(res);

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

    const response = await axios.get(file.fileUrl, {
    responseType: "stream",
  });

  response.data.pipe(res);

};

