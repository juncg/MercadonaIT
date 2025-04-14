# Food Ordering App - Backend

## Overview
This is the backend part of the Food Ordering App, which allows users to select food items from a list and add them to their cart. The backend is built using Node.js and Express, providing a RESTful API for the frontend application.

## Features
- Fetch a list of available food items.
- Add food items to the user's cart.
- Remove food items from the cart.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd food-ordering-app/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the backend server, run:
```
npm start
```
The server will run on `http://localhost:5000` by default.

## API Endpoints
- `GET /api/foods`: Retrieve a list of food items.
- `POST /api/cart`: Add an item to the cart.
- `DELETE /api/cart/:id`: Remove an item from the cart.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.