import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffPortal = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/payments', { withCredentials: true });
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h1>Staff Portal - Payment Details</h1>
      <table>
        <thead>
          <tr>
            <th>Payer Name</th>
            {/* <th>Payer Account Number</th> */}
            <th>Payee Account</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>SWIFT Code</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment.payer.name}</td>
              {/* <td>{payment.payer.accountNumber}</td> */}
              <td>{payment.payeeAccount}</td>
              <td>{payment.amount}</td>
              <td>{payment.currency}</td>
              <td>{payment.swiftCode}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPortal;