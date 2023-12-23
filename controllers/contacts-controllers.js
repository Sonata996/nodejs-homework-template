import HttpError from "../helpers/HttpError.js";
import Contact from "../models/Contact.js";
import { contactAddSchema, contactUpdateSchema } from "../models/Contact.js";

const optionsUpdate = {
  new: true,
  runValidators: true,
};

const getContactsAll = async (req, res, next) => {
  const result = await Contact.find();

  res.json(result);
};

const getbyId = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deletbyId = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContactbyId = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `${contactId} not found`);
  }
  res.json(result);
};

export default {
  getContactsAll,
  getbyId,
  add,
  deletbyId,
  updateContactbyId,
  updateStatusContact,
};
