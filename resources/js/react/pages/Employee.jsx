import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import UpdateForm from './../components/UpdateForm';

const Employee = () => {

    const { id } = useParams(); 
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        axios.get(`/api/employees/${id}`)
            .then((response) => setEmployee(response.data))
            .catch((error) => console.error("Error fetching post:", error));
    }, [id]);

    return (
        <div className="container mx-auto p-6">

            <h1 className="text-3xl font-semibold text-center mb-6">{employee?.name} {employee?.surname}</h1>

            <nav className="text-center mb-6">
                <ul>
                    <li>
                        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>

            {employee ? (
                <div>

                    <UpdateForm emp={employee} />

                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
};

export default Employee;
