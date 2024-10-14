import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payments data from the server
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/payments', { withCredentials: true });
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments data:', error);
      }
    };

    fetchPayments();
  }, []);

  const columns = [
    {
      name: 'payer',
      label: 'Payer Name',
      options: {
        customBodyRender: (value) => value.name,
      },
    },
    { name: 'payeeAccount', label: 'Payee Account' },
    { name: 'amount', label: 'Amount' },
    { name: 'currency', label: 'Currency' },
    { name: 'swiftCode', label: 'SWIFT Code' },
    { name: 'createdAt', label: 'Created At', options: { customBodyRender: (value) => new Date(value).toLocaleString() } },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    selectableRows: 'none',
  };

  return (
    <MUIDataTable
      title={'Payments'}
      data={payments}
      columns={columns}
      options={options}
    />
  );
};

export default PaymentsTable;