#!/bin/bash

# Simulate different affiliate tracking scenarios

echo "Impact.com Affiliate Tracking Test Script"
echo "========================================"
echo

# Test 1: Basic tracking test with clickId
echo "Test 1: Basic tracking with clickId"
echo "URL: http://localhost:3000/?clickId=test_click_123"
echo "Expected behavior: clickId should be captured and stored with the order"
echo

# Test 2: Affiliate ID tracking
echo "Test 2: Affiliate ID tracking"
echo "URL: http://localhost:3000/?affiliateId=test_affiliate_456"
echo "Expected behavior: affiliateId should be captured and stored with the order"
echo

# Test 3: Combined parameters
echo "Test 3: Combined tracking parameters"
echo "URL: http://localhost:3000/?clickId=test_click_789&affiliateId=test_affiliate_012"
echo "Expected behavior: Both clickId and affiliateId should be captured and stored with the order"
echo

# Test 4: Deep link to product page with tracking
echo "Test 4: Deep link to product with tracking"
echo "URL: http://localhost:3000/product/[PRODUCT_ID]?clickId=product_specific_345"
echo "Expected behavior: clickId should be captured even when landing directly on a product page"
echo

echo "Instructions:"
echo "1. Open each URL in your browser"
echo "2. Add a product to cart and complete checkout"
echo "3. Verify tracking parameters are shown on the order confirmation page"
echo

echo "To check the database directly, run:"
echo "podman exec impact-mongo mongo impact_ecommerce --eval 'db.orders.find().pretty()'"