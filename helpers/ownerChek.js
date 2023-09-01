const ownerChek = (req) => {
  const owner = req.user._id;
  const { contactId } = req.params;

  return { _id: contactId, owner };
};

module.exports = ownerChek;
