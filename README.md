
---

# **Cloud Functions Boilerplate**

## **Overview**

This project is a boilerplate for Firebase Cloud Functions using TypeScript. It provides a structured setup for creating, testing, and deploying serverless functions on Firebase.

## **Features**

- **Firebase Admin SDK**: For interacting with Firebase services.
- **TypeScript**: This is for type safety and modern JavaScript features.
- **Zod**: For schema validation.
- **Prettier and ESLint**: For code formatting and linting.
- **Custom Utility Functions**: For HTTP requests, logging, and more.

## **Project Structure**

- **`functions/src/`**: Contains the source code for your Firebase functions.
  - **`config/`**: Configuration files.
  - **`constants/`**: Constants used throughout the project.
  - **`libraries/`**: Custom libraries or utility functions.
  - **`types/`**: TypeScript type definitions.
  - **`utils/`**: Utility functions.
  - **`validators/`**: Request body validation schemas.


## **Setup**

### **Prerequisites**

1. **Node.js**: Ensure you have Node.js installed. 
2. **Firebase CLI**: Install the Firebase CLI if you haven’t already:

   ```bash
   npm install -g firebase-tools
   ```

3. **Initialize Firebase Project**: If you haven’t already initialized a Firebase project, run:

   ```bash
   firebase init
   ```

### **Installation**

1. **Clone the Repository**:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Navigate to Functions Directory**:

   ```bash
   cd functions
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

## **Development**

### **Running Locally**

To run your Firebase functions locally, use the Firebase emulator suite:

```bash
firebase emulators: start
```

### **Building**

To compile the TypeScript files into JavaScript, run the following:

```bash
npm run build
```

## **Deployment**

To deploy your functions to Firebase:

```bash
firebase deploy --only functions
```

## **Testing**

To run tests, use:

```bash
npm test
```
