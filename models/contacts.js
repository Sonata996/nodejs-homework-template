import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const pathContacts = path.resolve("models", "contacts.json");

const updateListContacts = (contact) =>
  fs.writeFile(pathContacts, JSON.stringify(contact, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(pathContacts);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((elem) => elem.id === contactId);

  return result || null;
};

export const addContact = async (body) => {
  const data = await listContacts();
  const newContacts = {
    ...body,
    id: nanoid(),
  };
  data.push(newContacts);
  await updateListContacts(data);
  return newContacts;
};

export const removeContact = async (contactId) => {
  const data = await listContacts();
  const indexElem = data.findIndex((elem) => elem.id === contactId);
  if (indexElem === -1) {
    return null;
  }
  const [result] = data.splice(indexElem, 1);
  await updateListContacts(data);
  return result;
};

export const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((elem) => elem.id === contactId);
  if (index === -1) {
    return null;
  }

  data[index] = { ...data[index], ...body };
  await updateListContacts(data);
  return data[index];
};
