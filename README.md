# Task Manager APP

The Task Manager APP is a RESTful webapp to manage tasks and their associated data. It allows users to create, read, update, and delete tasks, as well as perform additional actions such as marking tasks as completed, login/signin and delete user.

## Getting Started

These instructions will help you get a copy of the Task Manager APP up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.
- Express installed and running.
- MongoDB installed and running.

### Installing

1. Clone the repository:

  `git clone https://github.com/Younesfdj/task-manager-app.git`

2. Install the dependencies:

  `cd task-manager-app`
  `npm install`

3. Configure the environment variables:
   - Update the environment variables in the `.env` file with your configuration (MONGO_URI,PORT,SECRET_JWT,JWT_EXP).

4. Start the development server:

  `npm start` 

## API Endpoints

The following API endpoints are available :

### Tasks:
- `GET api/v1/tasks` - Get all tasks.
- `GET api/v1/tasks/:id` - Get a specific task by ID.
- `POST api/v1/tasks` - Create a new task.
- `PATCH api/v1/tasks/:id` - Update a task by ID.
- `DELETE api/v1/tasks/:id` - Delete a task by ID.

### Users:
- `POST api/v1/login` - login to a user.
- `POST api/v1/register` - Register a new user.
- `DELETE api/v1/delUser` - Delete a user.

You must be authenticated to read, create, update, or delete a task. Authentication is done via JWT. To test the api sepratly you should pass the token in the `Authorization` header as a Bearer token.

## Built With

- Node.js - JavaScript runtime.
- Express.js - Web application framework.
- MongoDB - NoSQL database for data storage.


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
