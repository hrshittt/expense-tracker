# Full-Stack Expense Tracker

A modern full-stack web and mobile application to help users manage their personal expenses, track their spending, and maintain better financial health. The project is split into a robust Node.js backend API and a cross-platform mobile application built with React Native and Expo.

## Project Architecture

This repository is structured as a monorepo containing two main parts:
- **`/backend`**: REST API built with Node.js, Express, and MongoDB. Handles user authentication (JWT), secure password hashing, and all CRUD operations for expenses.
- **`/mobile`**: The frontend mobile application built with React Native and Expo. It provides a clean, user-friendly interface for adding expenses, viewing analytics, handling user authentication, and reviewing history.

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- dotenv for environment variables

**Frontend (Mobile):**
- React Native
- Expo
- React Navigation (Native Stack & Bottom Tabs)
- Axios for API requests
- AsyncStorage for local token storage

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v16.x or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a MongoDB Atlas URI)
- [Expo Go](https://expo.dev/go) app installed on your iOS or Android device (for mobile testing)

---

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `/backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   *(Replace `your_mongodb_connection_string` and `your_jwt_secret_key` with your actual MongoDB URI and a secure secret key).*

4. **Start the backend server:**
   ```bash
   node server.js
   ```
   The server should now be running on `http://localhost:5000`.

---

### Mobile (Frontend) Setup

1. **Navigate to the mobile directory (open a new terminal tab):**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Endpoint Connection:**
   Ensure the mobile app points to your local backend server. Open `/mobile/src/api/axios.js` (or similar network config file) and configure the base URL. 
   *(Note: If you are testing on a physical device, make sure to use your computer's local IP address rather than `localhost` for it to connect properly).*

4. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

5. **Run the App:**
   - Scan the QR code generated in the terminal using the **Expo Go** app on your physical device.
   - Alternatively, press `a` to run on an Android emulator or `i` to run on an iOS simulator.

---

## 🛠 Features

- **User Authentication:** Secure registration and login using JWT.
- **Expense Management:** Add, edit, delete, and view expenses.
- **Analytics Dashboard:** Visualize spending and get an overview of your financial health.
- **Persistent Logic:** Data successfully syncs between the mobile application and database.
- **Cross-Platform:** Works seamlessly on both iOS and Android.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/hrshittt/expense-tracker/issues).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
