const express = require("express");
const { addContactSchema } = require("../../schemas/contacts");
const { validateBody } = require("../../middleware/index");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    console.log(contact);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(addContactSchema), async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "No contact" });
    }
    await removeContact(contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validateBody(addContactSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { name, email, phone } = req.body;
      const contact = await updateContact(contactId, { name, email, phone });
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
