import express from "express";
import controllersContacts from "../../controllers/contacts-controllers.js";
import validateBody from "../../decorators/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactsUpdateStatusSchema,
} from "../../models/Contact.js";
import isValidId from "../../middlewares/isValidId.js";
import isEmplyBody from "../../middlewares/isEmplyBody.js";
import isToken from "../../middlewares/isToken.js";

const router = express.Router();

router.get("/", isToken, controllersContacts.getContactsAll);

router.get("/:contactId", isToken, isValidId, controllersContacts.getbyId);

router.post(
  "/",
  isToken,
  isEmplyBody,
  validateBody(contactAddSchema),
  controllersContacts.add
);

router.delete("/:contactId", isToken, isValidId, controllersContacts.deletbyId);

router.put(
  "/:contactId",
  isToken,
  isValidId,
  isEmplyBody,
  validateBody(contactUpdateSchema),
  controllersContacts.updateContactbyId
);

router.patch(
  "/:contactId/favorite",
  isToken,
  isValidId,
  isEmplyBody,
  validateBody(contactsUpdateStatusSchema),
  controllersContacts.updateStatusContact
);
export default router;
