const authenticate = require("./authenticate");
const isValidId = require("./isValiId");
const upload = require("./upload");
const validateBody = require("./validateBody");

module.exports = {
  authenticate,
  isValidId,
  validateBody,
  upload,
};
