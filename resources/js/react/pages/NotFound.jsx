import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container mx-auto p-6">

            <h1 className="text-3xl font-semibold text-center mb-6">Welcome to the NotFound Page</h1>

            <nav className="text-center mb-6">
                <ul>
                    <li>
                        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NotFound;
