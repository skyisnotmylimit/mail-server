// server.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running..." });
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: "skyisnotmylimit.dev@gmail.com",
    subject: `New message from ${name}`,
    text: `You received a message from ${name} (${email}): ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).send("Email sent successfully");
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
