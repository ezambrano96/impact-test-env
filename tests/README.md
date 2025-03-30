# Testing Affiliate Tracking

This directory contains scripts for testing the affiliate tracking functionality.

## Running the Tests

1. Make sure the application is running with `npm start` in the root directory.

2. Make the test script executable:
   ```
   chmod +x simulate_tracking.sh
   ```

3. Run the test script:
   ```
   ./simulate_tracking.sh
   ```

4. Follow the instructions provided by the script to test different tracking scenarios.

## Manual Testing

For manual testing of Impact.com affiliate tracking, use the following URL patterns:

1. Basic clickId tracking:
   ```
   http://localhost:3000/?clickId=YOUR_CLICK_ID
   ```

2. Affiliate tracking:
   ```
   http://localhost:3000/?affiliateId=YOUR_AFFILIATE_ID
   ```

3. Campaign tracking:
   ```
   http://localhost:3000/?campaignId=YOUR_CAMPAIGN_ID
   ```

4. Combined parameters:
   ```
   http://localhost:3000/?clickId=YOUR_CLICK_ID&affiliateId=YOUR_AFFILIATE_ID&campaignId=YOUR_CAMPAIGN_ID
   ```

## Verifying Tracking Data

After completing an order, you can verify that the tracking data was properly captured by:

1. Checking the order confirmation page, which should display the tracking information.

2. Directly querying the MongoDB database:
   ```
   podman exec impact-mongo mongo impact_ecommerce --eval 'db.orders.find().pretty()'
   ```

## Integration Test Scenarios

The following scenarios should be tested:

1. **Basic conversion tracking**: User arrives via affiliate link, adds product to cart, and completes checkout.

2. **Multi-page journey**: User arrives via affiliate link, browses multiple products, and completes checkout later.

3. **Cart abandonment and return**: User arrives via affiliate link, adds products to cart, leaves the site, and returns later to complete the purchase.

4. **Multiple tracking parameters**: Ensure all tracking parameters are captured correctly.

These tests will help ensure that the Impact.com tracking integration works correctly across different user journeys.