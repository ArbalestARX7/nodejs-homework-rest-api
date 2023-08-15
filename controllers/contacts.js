const {
  Contact,
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");

  res.json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId, "-createdAt -updatedAt");

  res.json(contact);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ message: "Delete Success" });
};

const updateById = async (req, res) => {
  const { error } = updateSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing field favorite");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
