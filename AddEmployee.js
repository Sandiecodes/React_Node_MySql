import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const addEmployee = () => {
    axios.post('http://0.0.0.0:8080/addemployee', { name, department })
      .then(response => {
        console.log(response.data);
        // Notify the parent component that a new employee has been added
        onAddEmployee();
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Department:
        <input type="text" value={department} onChange={e => setDepartment(e.target.value)} />
      </label>
      <button onClick={addEmployee}>Add Employee</button>
    </div>
  );
};

export default EmployeeForm;
