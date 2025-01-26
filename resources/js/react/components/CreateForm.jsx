import React, { useState } from 'react';
import axios from 'axios';

const CreateForm = ({ bosses, updateApiEmployees }) => {
    const [formData, setFormData] = useState({
        boss_id: "",
        name: "",
        surname: "",
        position: "",
        email: "",
        home_phone: "",
        notes: "",
    });

    const onSubmit = (formData) => {
        axios.post("/api/employees", formData)
            .then((response) => {
                updateApiEmployees()
                alert("Employee added successfully!");
            })
            .catch((error) => {
                console.error("Error adding employee:", error);
            });
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleForm = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="container mx-auto p-6 text-center">
            <button
              onClick={toggleForm}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {isOpen ? "Close Form" : "Open Form"}
            </button>

            <div
              className={`mt-4 transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
                <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="boss_id" className="block text-gray-700 font-medium">
                            Boss
                        </label>
                        <select
                            id="boss_id"
                            name="boss_id"
                            min="1"
                            value={formData.boss_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-center"
                        >
                            <option value="">Select Boss</option>
                            {bosses.map((boss) => (
                                <option key={boss.id} value={boss.id}>
                                    {boss.name} {boss.surname}
                                </option>
                            ))}
                        </select>
                    </div>

                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                  </div>

                  <div className="mb-4">
                      <label htmlFor="surname" className="block text-gray-700 font-medium">
                          Surname
                      </label>
                      <input
                          type="text"
                          id="surname"
                          name="surname"
                          value={formData.surname}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          required
                      />
                  </div>

                    <div className="mb-4">
                        <label htmlFor="position" className="block text-gray-700 font-medium">
                            Position
                        </label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="home_phone" className="block text-gray-700 font-medium">
                            Home Phone
                        </label>
                        <input
                            type="text"
                            id="home_phone"
                            name="home_phone"
                            value={formData.home_phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="notes" className="block text-gray-700 font-medium">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateForm;
