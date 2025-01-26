import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CreateForm from './../components/CreateForm';
import Pagination from '../components/Pagination';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiEmployees(currentPage);
    }, [currentPage]);

    const apiEmployees = async (page) => {
        axios.get(`http://localhost:8000/api/employees?page=${page}`)
            .then(response => {
                setEmployees(response.data.data);
                setLastPage(response.data.last_page);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch employees');
                setLoading(false);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
          axios.delete(`/api/employees/${employeeId}`)
                .then(() => {
                    alert("Employee deleted successfully!");
                    apiEmployees(currentPage);
                })
                .catch((error) => {
                    console.error("Error deleting employee:", error);
                    alert("Failed to delete employee.");
                });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-6">

            <h1 className="text-3xl font-semibold text-center mb-6">Employees</h1>

            <nav className="text-center mb-6">
                <ul>
                    <li>
                        <Link to="/employee-tree" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Employee Tree
                        </Link>
                    </li>
                </ul>
            </nav>

            <CreateForm bosses={employees} updateApiEmployees={ () => apiEmployees(currentPage)} />

            <Pagination lastPage={lastPage} currentPage={currentPage} onPageChange={handlePageChange}/>

            <div className="overflow-x-auto px-4 py-6">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
    
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">ID</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">Surname</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">Boss</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">Position</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">Phone</th>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {[...employees].map(employee => (
                            <tr key={employee.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {employee.id}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={`/employee/${employee.id}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                                        {employee.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {employee.surname}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={`/employee/${employee.boss_id}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                                        {employee.boss_id}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {employee.position}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {employee.email}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {employee.home_phone}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>

            <Pagination lastPage={lastPage} currentPage={currentPage} onPageChange={handlePageChange}/>

        </div>
    );
};

export default Home;
