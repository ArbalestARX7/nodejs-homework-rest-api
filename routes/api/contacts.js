const express = require("express");
const ctrl = require("../../controllers/contacts");
const { authenticate, isValidId, validateBody } = require("../../mіddlewares");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(updateSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
