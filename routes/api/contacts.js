import express from "express";
import controllersContacts from "../../controllers/contacts-controllers.js";
const router = express.Router();

router.get("/", controllersContacts.getContactsAll);

router.get("/:contactId", controllersContacts.getbyId);

router.post("/", controllersContacts.add);

router.delete("/:contactId", controllersContacts.deletbyId);

router.put("/:contactId", controllersContacts.updateContactbyId);

export default router;
