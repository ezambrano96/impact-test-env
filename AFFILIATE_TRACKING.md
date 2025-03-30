# Affiliate Tracking Integration Guide

This document outlines how to use and test the affiliate tracking functionality in the Impact.com test environment.

## How Tracking Works

1. **Parameter Capture**: The application captures tracking parameters from the URL when a user first visits the site
2. **Parameter Storage**: These parameters are stored in the browser's sessionStorage to persist across page navigation
3. **Order Association**: When a user completes a purchase, the captured tracking data is associated with the order
4. **Data Access**: Tracking data is viewable on the order confirmation page and stored in the database

## Supported Tracking Parameters

The following URL parameters are supported:

| Parameter     | Description                                    | Example                                 |
|---------------|------------------------------------------------|-----------------------------------------|
| `clickId`     | The unique click identifier                    | `http://localhost:3000/?clickId=abc123` |
| `affiliateId` | The ID of the referring affiliate              | `http://localhost:3000/?affiliateId=partner456` |
| `campaignId`  | The campaign identifier (if applicable)        | `http://localhost:3000/?campaignId=summer2023` |
| `source`      | The traffic source or channel                  | `http://localhost:3000/?source=email` |

Multiple parameters can be combined with the standard URL query string format:
```
http://localhost:3000/?clickId=abc123&affiliateId=partner456&campaignId=summer2023
```

## Testing Affiliate Tracking

### Manual Testing

1. Start the application:
   ```
   npm start
   ```

2. Open your browser with one of the test URLs:
   ```
   http://localhost:3000/?clickId=test123&affiliateId=aff456
   ```

3. Add products to your cart and complete the checkout process.

4. On the order confirmation page, you should see the tracking information displayed.

### Using the Test Script

A test script is provided to help simulate different tracking scenarios:

1. Make the script executable:
   ```
   chmod +x tests/simulate_tracking.sh
   ```

2. Run the script:
   ```
   npm run test:tracking
   ```

3. Follow the instructions displayed by the script.

## Verifying Tracking Data in MongoDB

To verify that tracking data is properly stored in the database:

```
podman exec impact-mongo mongo impact_ecommerce --eval 'db.orders.find({}, {"items": 0}).pretty()'
```

This will show all orders with their tracking information.

## Future Impact.com Integration

To integrate with the actual Impact.com tracking system, the following changes would be needed:

1. Include the Impact.com JavaScript tag in the frontend/public/index.html file

2. Modify the OrderConfirmationPage component to trigger an Impact.com conversion event:
   ```javascript
   // Example of Impact.com conversion tracking
   useEffect(() => {
     if (order && window.IMPACT) {
       window.IMPACT.Event({
         "campaignId": order.trackingInfo?.campaignId || "",
         "pageType": "conversion",
         "orderId": order._id,
         "items": order.items.map(item => ({
           "sku": item.sku,
           "name": item.name,
           "price": item.price,
           "quantity": item.quantity
         })),
         "totalPrice": order.totalAmount
       });
     }
   }, [order]);
   ```

3. Implement server-side conversion validation in the backend/routes/orders.js file using the Impact.com API.

Note: The actual implementation may vary based on Impact.com's current documentation and requirements.