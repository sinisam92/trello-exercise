# Project Documentation

## Testing API Endpoints with Swagger

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
