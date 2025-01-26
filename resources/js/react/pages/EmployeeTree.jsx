import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const EmployeeTree = () => {
    const [employeeTree, setEmployeeTree] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/employee-tree")
            .then((response) => {
                setEmployeeTree(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching employee tree:", error)
                setError('Failed to fetch employees');
                setLoading(false);
            });
    }, []);

    const renderTree = (employees) => {
        return (
            <ul className="ml-6 list-disc">
                {employees.map((employee) => (
                    <li key={employee.id} className="mb-2">
                                       
                        {employee.boss_id === null ? <h3>#######</h3> : ''}

                        <Link to={`/employee/${employee.id}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                        
                            <span className="font-bold">
                                {employee.boss_id === null ? 'ROOT' : ''} {employee.id} {employee.name} {employee.surname}
                            </span> - {employee.position}

                        </Link>

                        {employee.subordinates && employee.subordinates.length > 0 && (
                            <div className="ml-4">
                                {renderTree(employee.subordinates)}
                            </div>
                        )}

                    </li>
                ))}
            </ul>
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-center text-2xl font-bold mb-4">Employee Tree</h1>
            
            <nav className="text-center mb-6">
                <ul>
                    <li>
                        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
            
            {employeeTree.length > 0 ? (
                renderTree(employeeTree)
            ) : (
                <p>No employees found.</p>
            )}

        </div>
    );
};

export default EmployeeTree;
