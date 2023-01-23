const { Schema, model } = require("mongoose");
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKay: false,
    timestamps: true,
  }
);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
