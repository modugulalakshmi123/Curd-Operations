import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    accno: '',
    name: '',
    bal: '',
    phone: '',
    location: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [isDeleting, setIsDeleting] = useState(false); // Track if we are in delete mode
  const [editId, setEditId] = useState(null); // Track the id of the service being edited or deleted

  // Fetch services from API
  const fetchServices = async () => {
    const response = await axios.get('http://localhost:8082/connect/getServices'); // Replace with your API endpoint
    setServices(response.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding or updating service
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDeleting) {
      return; // Prevent submitting if we are in delete mode
    }
    if (isEditing) {
      await axios.put(`http://localhost:8082/connect/update/${editId}`, formData); // Update the service
    } else {
      await axios.post('http://localhost:8082/connect/add', formData); // Add new service
    }
    fetchServices(); // Refresh the list
    resetForm(); // Reset form
  };

  // Handle editing a service
  const handleEdit = (service) => {
    setFormData(service); // Populate form with the selected service
    setEditId(service.accno); // Track the service ID (using accno since ID is missing)
    setIsEditing(true); // Enter edit mode
    setIsDeleting(false); // Ensure we are not in delete mode
  };

  // Handle deleting a service
  const handleDelete = (service) => {
    setFormData(service); // Populate form with the selected service
    setEditId(service.accno); // Track the service ID (using accno)
    setIsEditing(false); // Ensure we are not in edit mode
    setIsDeleting(true); // Enter delete mode
  };

  // Confirm delete
  const confirmDelete = async () => {
    await axios.delete(`http://localhost:8082/connect/delete/${editId}`); // Delete the service
    fetchServices(); // Refresh the list
    resetForm(); // Reset form
  };

  // Reset form
  const resetForm = () => {
    setFormData({ accno: '', name: '', bal: '', phone: '', location: '' });
    setIsEditing(false);
    setIsDeleting(false);
    setEditId(null);
  };

  return (
    <div className="container mt-4 custom-border">
      <h2>Banking Application</h2>
      <form onSubmit={handleSubmit} className="custom-border">
        <div className="mb-3">
            <label>
                Account Number  :
            </label>
          <input
            type="text"
            name="accno"
            placeholder="Account Number"
            value={formData.accno || ''} // Fixing uncontrolled input warning
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
            <label>
                Name     :
            </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name || ''} // Fixing uncontrolled input warning
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
            <label>
                Balance :
            </label>
          <input
            type="text"
            name="bal"
            placeholder="Balance"
            value={formData.bal || ''} // Fixing uncontrolled input warning
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
            <label>Phone No :</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone || ''} // Fixing uncontrolled input warning
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
            <label>
                Location :
            </label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location || ''} // Fixing uncontrolled input warning
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isDeleting}>
          {isEditing ? 'Update Service' : 'Add Service'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
        {isDeleting && (
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={confirmDelete}
          >
            Confirm Delete
          </button>
        )}
      </form>

      <table className="table mt-4 custom-table-border">
        <thead className="thead-dark">
          <tr>
            <th>Account Number</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.accno}> {/* Use 'accno' as key, since it's unique */}
              <td>{service.accno}</td>
              <td>{service.name}</td>
              <td>{service.bal}</td>
              <td>{service.phone}</td>
              <td>{service.location}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(service)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(service)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServices;
