import React, { useState } from 'react';
import EmployeeForm from './AddEmployee';
import EmployeeList from './ShowEmployee';

const App = () => {
  const [updateList, setUpdateList] = useState(false);

  const handleAddEmployee = () => {
    // Set the flag to update the employee list
    setUpdateList(!updateList);
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <EmployeeForm onAddEmployee={handleAddEmployee} />
      <EmployeeList key={updateList} />
    </div>
  );
};

export default App;
