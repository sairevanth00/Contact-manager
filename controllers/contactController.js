const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

/**
 * Method to get contacts
 * @param {*} req
 * @param {*} res
 */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

/**
 * Method to get contact
 * @param {*} req
 * @param {*} res
 */
const getContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
  } catch (err) {
    res.status(404);
    throw new Error("Contact Not Found!");
  }
});

/**
 * Method to create contact
 * @param {*} req
 * @param {*} res
 */
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneno } = req.body;
  try {
    const contact = await Contact.create({ name, email, phoneno, user_id: req.user.id });
    if(!name || !email || !phoneno) {
      res.status(400);
      throw new Error("All Fields are mandatory!")
    }
    res.status(201).json(contact);
  } catch (err) {
    throw new Error(err);
  }
});

/**
 * Method to update contact
 * @param {*} req
 * @param {*} res
 */
const updateContact = asyncHandler(async (req, res) => {
  // try {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
      res.status(404);
      throw new Error("Contact Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  // } catch (err) {
  //   res.status(404);
  //   throw new Error("Contact Not Found!");
  // }
});

/**
 * Method to delete contact
 * @param {*} req
 * @param {*} res
 */
const deleteContact = asyncHandler(async (req, res) => {
  // try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts")
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
  // } catch (err) {
  //   res.status(404);
  //   throw new Error("Contact Not Found!");
  // }
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
