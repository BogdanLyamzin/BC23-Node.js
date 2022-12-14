const express = require("express");

const ctrl = require("../../controllers/books")

const {ctrlWrapper} = require("../../helpers")

const {validateBody, isValidId, authenticate} = require("../../middlewares")

const {schemas} = require("../../models/book")

const router = express.Router();

// const getAllController = ctrlWrapper(ctrl.getAll)
// router.get("/", getAllController)
router.get("/", authenticate, ctrlWrapper(ctrl.getAll))

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById))

router.post("/", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add))

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById))

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeById))

module.exports = router;