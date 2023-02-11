require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "maksim.stryuts@meta.ua" };
  try {
    await sgMail.send(email);
    console.log("Email sent");
    return true;
  } catch (error) {
    throw error.message;
  }
};

module.exports = sendEmail;
