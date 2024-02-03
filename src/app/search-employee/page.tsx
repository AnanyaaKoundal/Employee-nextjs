"use client"

import { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    // Add other fields as needed
}

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("/api/users/employees");
                setEmployees(response.data.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((employee) =>
        employee.mobile.toString().includes(searchTerm)
    );

    const handleDelete = async (employeeId: string) => {
        try {
            await axios.delete(`/api/users/employees/${employeeId}`);
            // Remove the deleted employee from the state
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee._id !== employeeId)
            );
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search by mobile number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmployees.map((employee) => (
                    <div
                        key={employee._id}
                        className="bg-white rounded-lg shadow-md p-4"
                    >
                        <h2 className="text-xl font-semibold mb-2">{employee.name}</h2>
                        <p className="text-gray-600">Email: {employee.email}</p>
                        <p className="text-gray-600">Mobile no: {employee.mobile}</p>
                        <button
                            onClick={() => handleDelete(employee._id)}
                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

