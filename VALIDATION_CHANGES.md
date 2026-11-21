# RIMS Validation Updates

## Backend
- Added maximum/minimum lengths and format checks for product, SKU, barcode, supplier, warehouse, login, registration and order request fields.
- Added positive ID checks, quantity bounds, decimal precision checks and nested order-item validation.
- Added inventory adjustment type/quantity/reorder-level validation and server-side safeguards against negative or excessive stock.
- Added a server-side rule preventing stock transfers from a warehouse to itself.
- Existing `@Valid` controller request validation and the existing validation error response format are retained.

## Frontend
- Added matching native form constraints for product, supplier, user, login, order, transfer, inventory and customer order inputs.
- Existing form structure, routes, API paths, data model and visual styling were left intact.

## Validation limits
- Product name: 2-120 characters
- SKU: 2-40 characters; letters, digits, dot, underscore and hyphen
- Product description: up to 1000 characters
- Barcode: up to 64 characters
- Product category: up to 60 characters
- Product price: 0.01-9999999999.99, max 2 decimal places
- Username: 3-20 characters; letters, digits, dot, underscore and hyphen
- Registration password: 8-64 characters
- Supplier name: 2-120 characters; contact: up to 100; email: up to 150; phone: 7-20 allowed characters when provided; address: up to 255
- Warehouse name: 2-120; location: up to 255; capacity: 1-100000000
- Order: 1-50 items; each quantity: 1-100000000
- Inventory SET quantity: 0-100000000; ADD/SUBTRACT quantity: 1-100000000; reorder level: 0-100000000
- Transfer quantity: 1-100000000; source and target must differ

## Verification status
Source-level review completed. A frontend production build could not be run in this environment because the Vite executable/dependencies were unavailable after dependency installation timed out. Maven is not installed in this environment, so backend compilation could not be run here. Run the build commands below locally before replacing the running containers.
