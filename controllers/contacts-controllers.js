import HttpError from "../helpers/HttpError.js";
import * as contactsServer from "../models/contacts.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contact-schemas.js";

const getContactsAll = async (req, res, next) => {
  try {
    const result = await contactsServer.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getbyId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServer.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsServer.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deletbyId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServer.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactbyId = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactsServer.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getContactsAll,
  getbyId,
  add,
  deletbyId,
  updateContactbyId,
};
