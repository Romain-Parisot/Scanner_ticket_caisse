import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import { createWorker } from "tesseract.js";
import tesseract from "node-tesseract-ocr";
let numbers = [];

// Initialize Tesseract.js worker
let worker = createWorker();

const app = express();
const port = 80;

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

app.get("/", (req, res) => {
  console.log("Received GET request to /");
  res.send("Hello World!");
});

app.post("/upload", async (req, res) => {
  console.log("Received POST request to /upload");

  if (!req.files || !req.files.image) {
    console.log("No files uploaded or no image submitted");
    return res.sendStatus(400);
  }

  const image = req.files.image;
  if (!/^image\/(jpeg|png|gif)$/.test(image.mimetype)) {
    console.log("Invalid image mimetype:", image.mimetype);
    return res.sendStatus(400);
  }

  image.name = Date.now() + "_" + image.name;

  if (!fs.existsSync("./images")) {
    fs.mkdirSync("./images");
  }

  try {
    await image.mv("./images/" + image.name);

    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };

    tesseract
      .recognize("./images/" + image.name, config)
      .then((text) => {
        console.log("Recognized text:", text);

        // Use a regular expression to find the number followed by "EUR" in the text
        const regex = /(\d+,\d{2})\s*EUR/;
        const match = text.match(regex);

        if (match) {
          // Convert the number to a float and add it to the list
          const number = parseFloat(match[1].replace(",", "."));
          numbers.push(number);
        }

        // Calculate the sum of all numbers in the list
        const sum = numbers.reduce((a, b) => a + b, 0);

        res.json({ text, sum });
      })
      .catch((error) => {
        console.log(error.message);
        res.sendStatus(500);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
