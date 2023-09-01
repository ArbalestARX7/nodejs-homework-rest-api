const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper, ownerChek } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite ? { owner, favorite } : { owner };
  const contacts = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.json(contacts);
};

const getById = async (req, res) => {
  const contact = await Contact.findOne(
    ownerChek(req),
    "-createdAt -updatedAt"
  );

  res.json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const result = await Contact.findOneAndRemove(ownerChek(req));

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "Delete Success" });
};

const updateById = async (req, res) => {
  const result = await Contact.findOneAndUpdate(ownerChek(req), req.body, {
    new: true,
  });

  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const result = await Contact.findOneAndUpdate(ownerChek(req), req.body, {
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
