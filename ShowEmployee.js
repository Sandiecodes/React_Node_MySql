import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://0.0.0.0:8080/getemployees')
      .then(response => setEmployees(response.data.employees))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name} - {employee.department}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
