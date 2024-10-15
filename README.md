Name: Muhammad

Surname: Amajee

Student Number: ST10117234

GitHub Repo Link: https://github.com/Muhammad-Amajee/secure-payments-portal

OneDrive Project Link: https://1drv.ms/u/c/6e2099341517f389/Ec2H_Q3azetDsG9bz8TgDjoB0MN6AyOX7qfh9yNaONqF7Q?e=DZcCUb

Youtube Video Link: https://youtu.be/rxi5HgcRUeA

International Payments Portal

Overview

This project implements a secure International Payments Portal, designed to facilitate and monitor cross-border payments. The system ensures that sensitive customer data is securely handled and offers real-time interaction with the SWIFT payment system.

Features
1. Customer Registration & Authentication
   - Customers can register by providing their full name, ID number, account number, and password.
   - Authentication uses account number, username, and password.

2. International Payments
   - Secure payment initiation by selecting currency, payment provider, and entering SWIFT code and account details.
   - Data encryption, validation, and secure transmission using SSL/TLS.

3. Employee Portal
   - Pre-registered employees can log in to verify and forward payments to SWIFT.
   - No employee registration required.

4. Security Implementations
   - Password Security: Hashing and salting applied.
   - Input Validation: Whitelisted input using RegEx to prevent injection attacks.
   - SSL/TLS: Secure transmission for all web traffic.
   - Protection Against Attacks: Hardened against session hijacking, SQL injection, clickjacking, XSS, MITM, and DDoS.
     
Project Structure
- Frontend: Implemented using React/Angular for both customer and employee portals.
- Backend: Secure REST API for data transmission and transaction processing.
- Database: Secure storage for transaction records and user credentials.
- CI/CD Pipeline: CircleCI pipeline integrated with SonarQube for continuous integration, code quality checks, and security scanning.
  
Tools & Technologies
- React/Angular: Frontend frameworks for building interactive portals.
- Node.js: Backend API development.
- MySQL/PostgreSQL: Secure database for transaction storage.
- CircleCI: Continuous Integration setup to automate builds and tests.
- SonarQube: Code analysis for security vulnerabilities and code smells.
- SSL/TLS: Data encryption during transmission.
- MobSF: Mobile app security testing.
- ScoutSuite: AWS security auditing tool for cloud services.
  
Installation & Setup
1. Clone Repository
   ```bash
   git clone https://github.com/your-repo/international-payments-portal.git
   cd international-payments-portal
   ```

2. Install Dependencies
   For backend:
   ```bash
   npm install
   ```
   For frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Environment Setup
   Create a `.env` file for backend configuration:
   ```
   DB_HOST=localhost
   DB_USER=user
   DB_PASSWORD=password
   JWT_SECRET=your_secret_key
   ```

4. Run the Application
   Backend:
   ```bash
   npm run start
   ```
   Frontend:
   ```bash
   cd frontend
   npm run start
   ```

5. Test & Linting
   Run tests and lint checks:
   ```bash
   npm run test
   npm run lint
   ```
   
Security Considerations
- Passwords: Stored using secure hashing algorithms (e.g., bcrypt) with salting.
- SSL/TLS: All traffic encrypted with SSL certificates.
- Input Whitelisting: All inputs validated using RegEx patterns to prevent malicious entries.
- Vulnerability Testing: MobSF and ScoutSuite used for security audits on mobile and cloud environments.
  
CI/CD Pipeline
The project uses CircleCI for continuous integration:
- Automated testing on every push.
- SonarQube integration for static code analysis and security checks.
  
Contribution Guidelines

We welcome contributions! Please contact the developer.

License

This project is licensed under the MIT License.

Contact

Name: Muhammad Amajee

Email: st10117234@vcconnect.edu.za
