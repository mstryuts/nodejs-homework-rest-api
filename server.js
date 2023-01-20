const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", true);

const { HOST_URI } = process.env;

// const { Contact } = require("./models/contacts");

const { Contact } = require("./models/contacts");

async function main() {
  try {
    await mongoose.connect(HOST_URI);

    console.log("Connected to mongodb!");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    const contacts = await Contact.find({});
    console.log(contacts);

    // const contacts = await Contact.find({});
    // console.log(contacts);
  } catch (error) {
    console.error("Error while connecting to mongodb", error.message);
    process.exit(1);
  }
}

main();
