API Design for Authentication System (FastAPI)
   ## POST /register
   - **Description**: Register a new user (Buyer or Seller).
   - **Request**:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "securepassword123",
       "role": "buyer" // or "seller"
     }
     ```
   - **Response** (201):
     ```json
     {
       "message": "User created",
       "user": { "id": 1, "email": "john@example.com", "role": "buyer" }
     }
     ```

   ## POST /login
   - **Description**: Authenticate a user and return a JWT.
   - **Request**:
     ```json
     {
       "email": "john@example.com",
       "password": "securepassword123"
     }
     ```
   - **Response** (200):
     ```json
     { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
     ```

   ## GET /me
   - **Description**: Get the authenticated user's details.
   - **Headers**: `Authorization: Bearer <token>`
   - **Response** (200):
     ```json
     {
       "id": 1,
       "name": "John Doe",
       "email": "john@example.com",
       "role": "buyer"
     }
     ```

   ## POST /logout (Optional)
   - **Description**: Log out the user (client-side token removal).
   - **Response** (200):
     ```json
     { "message": "Logged out" }
     ```
   bustion

