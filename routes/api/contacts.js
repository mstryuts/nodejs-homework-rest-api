const express = require("express");
const { addContactSchema, favoriteSchema } = require("../../schemas/contacts");
const { validateBody, validationFavorite } = require("../../middleware/index");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  changeContactStatus,
} = require("../../controllers/contact.controller");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", validateBody(addContactSchema), createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(addContactSchema), changeContact);

router.patch(
  "/:contactID/favorite",
  validationFavorite(favoriteSchema),
  changeContactStatus
);

module.exports = router;
