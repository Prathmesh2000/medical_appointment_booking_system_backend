# Project Setup Guide

## Environment Variables
To configure the project, create a `.env` file in the root directory of your project with the following variables:

- `PORT`: Specify the port on which you want the server to run.
- `JWT_SECRET`: Define a secret token for JWT authentication.
- `MONGO_URI`: Provide the MongoDB URI. Ensure the database is empty as the models will automatically create the required schemas.

Example `.env` file:
```
PORT=3000
JWT_SECRET=your_secret_token
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_database?retryWrites=true&w=majority
```

## Steps to Run the Project

### Development Mode
To run the project in development mode (with hot-reloading):
```bash
npm run dev
```

### Production Mode
To start the server in production mode:
```bash
npm run start
```


