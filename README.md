# Impact.com Affiliate Tracking Test Environment

A Podman-based e-commerce environment for testing Impact.com affiliate tracking integration.

## Overview

This project provides a simplified e-commerce application with the following features:

- Product listings page with 10 sample products
- Individual product detail pages
- Shopping cart functionality
- Simplified checkout process
- Order confirmation with tracking information
- Affiliate tracking parameter handling

## Technical Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Containerization**: Podman

## Setup & Installation

### Prerequisites

- [Podman](https://podman.io/getting-started/installation) installed on your system
- [podman-compose](https://github.com/containers/podman-compose) (optional but recommended)
- Git (to clone the repository)

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/ezambrano96/impact-test-env.git
   cd impact-test-env
   ```

2. Make the scripts executable:
   ```
   chmod +x podman-start.sh podman-stop.sh podman-cleanup.sh
   ```

3. Start the application:
   ```
   ./podman-start.sh
   ```
   
   Or with npm:
   ```
   npm start
   ```

4. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Testing with Affiliate Tracking Parameters

To test the affiliate tracking integration, you can use URL parameters when accessing the application:

1. Using the click ID parameter:
   ```
   http://localhost:3000/?clickId=test123
   ```

2. Using the affiliate ID parameter:
   ```
   http://localhost:3000/?affiliateId=aff456
   ```

3. Using multiple parameters:
   ```
   http://localhost:3000/?clickId=test123&affiliateId=aff456
   ```

The application will capture these parameters and include them in the order details when a purchase is completed.

## Managing the Environment

- **Start the environment**:
  ```
  npm start
  ```

- **Stop the environment**:
  ```
  npm run stop
  ```

- **Restart the environment**:
  ```
  npm run restart
  ```

- **Clean up all resources**:
  ```
  npm run cleanup
  ```

- **View logs**:
  ```
  npm run logs:frontend
  npm run logs:backend
  npm run logs:mongo
  ```

## Database Seeding

The database is automatically seeded with 10 sample products when the application starts. If you want to manually reset and reseed the database, you can use:

```
npm run seed
```

## Application Structure

### Frontend (React.js)

- **Pages**: Home, Product Details, Cart, Checkout, Order Confirmation
- **Components**: Header, Footer, ProductList, ProductCard, CartItem
- **Context**: CartContext for managing the shopping cart state

### Backend (Node.js/Express)

- **Models**: Product and Order schemas
- **Routes**: API endpoints for products and orders
- **Middleware**: Tracking parameter capture
- **Utils**: Database seeding and helper functions

## Development Notes

### Adding New Products

To add new products, you can modify the `seedDB.js` file in the backend/utils directory and add your products to the `sampleProducts` array.

### Extending Tracking Functionality

To add additional tracking parameters, modify the following files:
- `frontend/src/context/CartContext.js`: Update the useEffect hook to capture additional URL parameters
- `backend/middleware/trackingMiddleware.js`: Update to extract additional parameters from the request
- `backend/models/Order.js`: Update the trackingInfo schema to include new fields

## Future Integration with Impact.com

This environment is designed to be extended with actual Impact.com API integration. To implement this:

1. Add Impact.com SDK to the frontend
2. Implement conversion tracking in the OrderConfirmationPage component
3. Add server-side conversion validation in the backend

## License

[Specify your license information]