# Project Documentation

# Name: Project Pulse

## Overview  
Task/Projects Management App is a modern web application built to help users efficiently manage projects and tasks. It provides functionality to create, edit, delete projects, manage project members, and organize tasks.  

## Features  
- Create, edit, and delete projects.  
- Manage project members and assign tasks.  
- Organize tasks within projects with due dates, comments, and progress tracking.  
- Drag-and-drop support for task reordering.  
- Responsive design for seamless use across devices.  
- Accessibility-first design tested using Storybook.  

## Technologies Used  
The app is built with the following technologies: 
  - Client:
    - **Frontend:** React, Tailwind CSS, Vite  
    - **State Management:** Redux  
    - **Routing:** Wouter  
    - **Form Handling & Validation:** Formik, Yup  
    - **Component Documentation & Testing:** Storybook (including accessibility testing)  
    - **Testing:** Vitest, React Testing Library, Playwright  
    - **Code Quality:** ESLint  

- Server:
    - Node.js - Express
    - **Validation** express-validator
    - **Testing** Supertest - Jest
    - **Database** MongoDB - Mongoose
    - **Data** Faker 

## Installation  

### Prerequisites  
Make sure you have Node.js and npm installed.  

### Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/BEAM-WD-0323/task-management.git  
   ```

2. Navigate to the project directory:  
   ```bash  
   cd task-management/client - for frontend
        or
   cd task-management/server - for backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev - for frontend
   or 
   npm run start - for both
   ```
### Storybook

1. Start Storybook:
   ```bash
   npm run storybook
   ```
### Testing

1. Run all tests:
  ```bash
  npm run test
  ```

1. Playwright end-to-end tests:
  ```bash
  npm run test:e2e  
  ```
### Testing API Endpoints with Swagger

To test the API endpoints for this project, Swagger is used to provide a user-friendly interface for performing CRUD operations.

### Setting up Swagger

1. **Ensure Swagger UI is available:** Swagger documentation is included in the project.
2. **Open Swagger with Live Server (VS Code):**
   - Open `server/docs/swagger-ui.html` in your project’s root directory.
   - Right-click the file `swagger-ui.html` and select **Open with Live Server** (ensure the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension is installed).
   - This will launch a local server displaying the Swagger UI.

### API Base URL

The API endpoints are accessible at:

- **Localhost**: `http://localhost:3044`

### Testing Endpoints

With the Swagger UI, you can:
- View all available endpoints for **Users** and **Projects** resources.
- Test each endpoint by sending requests directly through the interface.
  - CRUD operations include `POST`, `GET`, `PUT`, and `DELETE`.
  
### Note
If you encounter **CORS** errors, ensure that the backend server is running and configured to allow requests from `http://localhost:<LiveServerPort>`.

Happy testing!
