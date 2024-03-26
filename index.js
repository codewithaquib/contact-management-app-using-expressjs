const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const PORT = 3001;

const app = express();
app.use(bodyParser.json());

let contacts = [
  {
    id: uuidv4(),
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
  },
  {
    id: uuidv4(),
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    address: "456 Elm St",
  },
];

// Get all contacts
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Get individual contact details
app.get("/contacts/:id", (req, res) => {
  let id = req.params.id;
  let contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found!" });
  }
  res.json(contact);
});

// Create a new contact
app.post("/contacts", (req, res) => {
  let { name, email, phone, address } = req.body;
  let id = uuidv4();
  let newContact = {
    id,
    name,
    email,
    phone,
    address,
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Update a contact
app.put("/contacts/:id", (req, res) => {
  let { name, email, phone, address } = req.body;
  let id = req.params.id;
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index == -1) {
    return res.status(404).json({ message: "Contact not found!" });
  }
  contacts[index] = { id, name, email, phone, address };
  res.json(contacts[index]);
});

// Delete a contact
app.delete("/contacts/:id", (req, res) => {
  let id = req.params.id;
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index == -1) {
    return res.status(404).json({ message: "Contact not found!" });
  }
  const deletedContact = contacts.splice(index, 1);
  res.json(deletedContact);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
