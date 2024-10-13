import { validateInput } from './Login';

describe('validateInput', () => {
  it('should validate username correctly', () => {
    expect(validateInput('validUser', 'username')).toBe(true);
    expect(validateInput('user', 'username')).toBe(false); // Too short
    expect(validateInput('thisIsAReallyLongUsername', 'username')).toBe(false); // Too long
    expect(validateInput('invalid user', 'username')).toBe(false); // Invalid characters
  });

  it('should validate password correctly', () => {
    expect(validateInput('ValidPass123!', 'password')).toBe(true);
    expect(validateInput('short1!', 'password')).toBe(false); // Too short
    expect(validateInput('thisIsAReallyLongPassword123!', 'password')).toBe(false); // Too long
    expect(validateInput('invalid pass', 'password')).toBe(false); // Invalid characters
  });

  it('should validate account number correctly', () => {
    expect(validateInput('12345678', 'accountNumber')).toBe(true);
    expect(validateInput('1234567', 'accountNumber')).toBe(false); // Too short
    expect(validateInput('123456789012345678901', 'accountNumber')).toBe(false); // Too long
    expect(validateInput('1234abcd', 'accountNumber')).toBe(false); // Invalid characters
  });
});