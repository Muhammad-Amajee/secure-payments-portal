import React from 'react';
import { useEffect, useState } from 'react';
import PaymentsTable from './PaymentsTable';
import '../App.css';

const StaffPortal = () => {
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('employeeName');
    setEmployeeName(name);
  }, []);
  return (
    <div className='staffPortal'>
      <div className='header'>
        <h1>Staff Portal</h1>
        <div className='employeeName'>
          Welcome, <span>{employeeName}</span>
        </div>
      </div>
      <div className='paymentsTable'>
        <PaymentsTable />
      </div>
    </div>
  );
};

export default StaffPortal;