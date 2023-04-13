const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public for now in the future will be authentication required

const getContacts = asyncHandler(async (req, res) => {
  const getAllContacts = await Contact.find({ user_id: req.user.id });
  res.json(getAllContacts);
});

//@desc Creates contacts
//@route POST /api/contacts
//@access public for now in the future will be authentication required

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  if (!name || !email || !phoneNumber) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const createContact = await Contact.create({
    name,
    email,
    phoneNumber,
    user_id: req.user.id,
  });
  res.json(createContact);
});

//@desc Get individual contact
//@route GET /api/contacts/:id
//@access public for now in the future will be authentication required

const getContact = asyncHandler(async (req, res) => {
  // if (!getContactbyId) {
  //   throw new Error("Contact not found");
  // }
  const getContactbyId = await Contact.findById(req.params.id);
  res.json(getContactbyId);
});

//@desc Update individual contact
//@route PUT /api/contacts/:id
//@access public for now in the future will be authentication required

const updateContact = asyncHandler(async (req, res) => {
  //@ probably not necessary because i use findByIdAndUpdate !!!deprecated

  const contact = await Contact.findById(req.params.id);

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update contact");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updateContact);
});

//@desc Delete individual contact
//@route DELETE /api/contacts/:id
//@access public for now in the future will be authentication required

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User cant delete this contact");
  }
  const getContactAndDelete = await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
