import React, { useState } from "react";
import "./App.css";
import data from "./mock-data.json";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [editRowId, setEditRowId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddContactFormSubmit = (event) => {
    event.preventDefault();
    const newContacts = [...contacts, addFormData];
    setContacts(newContacts);
  };

  const handleEditContactFormSubmit = (event) => {
    event.preventDefault();
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editRowId);
    newContacts[index] = editFormData;
    setContacts(newContacts);
    setEditRowId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditRowId(contact.id);
    setEditFormData(contact);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  return (
    <div className="app-container">
      <h1>My Contacts</h1>
      <form id="edit-form" onSubmit={handleEditContactFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <React.Fragment key={contact.id}>
                {editRowId === contact.id ? (
                  <tr>
                    <td>
                      <input
                        type="text"
                        required="required"
                        placeholder="Name"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required="required"
                        placeholder="Address"
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required="required"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={editFormData.phoneNumber}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required="required"
                        placeholder="Email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <button type="submit">Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{contact.name}</td>
                    <td>{contact.address}</td>
                    <td>{contact.phoneNumber}</td>
                    <td>{contact.email}</td>
                    <td>
                      <button
                        type="button"
                        onClick={(event) => handleEditClick(event, contact)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add New Contact</h2>
      <form onSubmit={handleAddContactFormSubmit}>
        <input
          type="text"
          required="required"
          placeholder="Name"
          name="name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          required="required"
          placeholder="Address"
          name="address"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          required="required"
          placeholder="Phone Number"
          name="phoneNumber"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          required="required"
          placeholder="Email"
          name="email"
          onChange={handleAddFormChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default App;
