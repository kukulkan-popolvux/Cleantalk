import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = ({ emp }) => {
    const [employee, setEmployee] = useState({
        boss_id: "",
        name: "",
        surname: "",
        position: "",
        email: "",
        home_phone: "",
        notes: "",
    });

    useEffect(() => {
        setEmployee(emp)
    }, [emp]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`/api/employees/${employee.id}`, employee)
            .then((response) => {
                alert("Employee updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating employee:", error);
                alert("Failed to update employee.");
            });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Update Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Boss ID</label>
                    <input
                        type="number"
                        name="boss_id"
                        min="1"
                        value={employee.boss_id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Surname</label>
                    <input
                        type="text"
                        name="surname"
                        value={employee.surname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Position</label>
                    <input
                        type="text"
                        name="position"
                        value={employee.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Home Phone</label>
                    <input
                        type="text"
                        name="home_phone"
                        value={employee.home_phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Notes</label>
                    <textarea
                        name="notes"
                        value={employee.notes}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>

                </div>
            </form>
        </div>
    );
};

export default UpdateForm;
