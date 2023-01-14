const fs = require("fs/promises");

const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}
async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  const db = await readDb();
  return db;
}

async function getContactById(id) {
  const db = await readDb();
  const contact = db.find((c) => c.id === id);
  return contact;
}

const removeContact = async (contactId) => {
  const db = await readDb();
  const updatedDb = db.filter((c) => c.id !== contactId);
  await writeDb(updatedDb);
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await readDb();
  contacts.push(newContact);

  await writeDb(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await readDb();

  const contact = contacts.find((item) => item.id === contactId);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  await writeDb(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
