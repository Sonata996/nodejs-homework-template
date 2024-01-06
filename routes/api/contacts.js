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

router.get("/:contactId", isValidId, controllersContacts.getbyId);

router.post(
  "/",
  isEmplyBody,
  validateBody(contactAddSchema),
  controllersContacts.add
);

router.delete("/:contactId", isValidId, controllersContacts.deletbyId);

router.put(
  "/:contactId",
  isValidId,
  isEmplyBody,
  validateBody(contactUpdateSchema),
  controllersContacts.updateContactbyId
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmplyBody,
  validateBody(contactsUpdateStatusSchema),
  controllersContacts.updateStatusContact
);
export default router;
