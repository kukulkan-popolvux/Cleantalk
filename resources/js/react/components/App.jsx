import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './../pages/Home';
import Employee from './../pages/Employee';
import EmployeeTree from './../pages/EmployeeTree';
import NotFound from './../pages/NotFound';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employee/:id" element={<Employee />} />
                <Route path="/employee-tree" element={<EmployeeTree />} />
                
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
