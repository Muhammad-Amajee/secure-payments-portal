import axios from 'axios';
import { makePayment } from './api';

jest.mock('axios');

describe('makePayment', () => {
  beforeAll(() => {
    process.env.API_URL = 'https://localhost:5000/api';
  });

  it('should make a payment successfully', async () => {
    const paymentData = { amount: 100, currency: 'USD' };
    const token = 'test-token';
    const responseData = { success: true };

    axios.post.mockResolvedValue({ data: responseData });

    const result = await makePayment(paymentData, token);

    expect(result).toEqual(responseData);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API_URL}/payments`,
      paymentData,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
  });

  it('should handle errors', async () => {
    const paymentData = { amount: 100, currency: 'USD' };
    const token = 'test-token';
    const errorMessage = 'Error making payment';

    axios.post.mockRejectedValue(new Error(errorMessage));

    await expect(makePayment(paymentData, token)).rejects.toThrow(errorMessage);
  });
});