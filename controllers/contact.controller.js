const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    console.log(contact);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  try {
    const { _id } = req.user;
    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "No contact" });
    }
    await Contact.findByIdAndRemove(contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

async function changeContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId, {
      name,
      email,
      phone,
      favorite,
    });

    res.json(contact);
  } catch (error) {
    next(error);
  }
}

async function changeContactStatus(req, res, next) {
  try {
    const { contactID } = req.params;
    const { favorite } = req.body;
    const updatedStatus = await Contact.findByIdAndUpdate(contactID, favorite, {
      new: true,
    });
    if (!updatedStatus) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(updatedStatus);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getContacts,
  getContact,
  deleteContact,
  changeContact,
  createContact,
  changeContactStatus,
};
