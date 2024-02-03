"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
  _id: string;
  name: string;
  email: string;
  dob: string;
  mobile: string;
  role: string;
  coverImage: string;
}

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 m-4">
      <img
        src={employee.coverImage}
        alt={employee.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{employee.name}</h2>
      <p className="text-sm text-gray-500">{employee.email}</p>
      <p className="text-sm text-gray-500">{employee.mobile}</p>
      <p className="text-sm text-gray-500">{employee.dob}</p>
      <p className="text-sm text-gray-500">{employee.role}</p>
    </div>
  );
};

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
      } catch (error:any) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {employees.map((employee) => (
        <EmployeeCard key={employee._id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeList;
