# TimeLux Frontend

TimeLux Frontend is a React application for a luxury watch e-commerce website. The application provides authentication screens, role-based navigation, member profile pages, product listing, product detail, filtering, sorting, and pagination.

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Ant Design

## Main Features

- User authentication with login, register, OTP verification, forgot password, and reset password.
- Role-based routing for Admin, User, and Moderator.
- Member storefront for role `R2`.
- Product listing page with promotion, newest, and best-selling sections.
- Product detail page with image gallery, stock quantity, sold quantity, quantity selector, specifications, and similar products.
- Product search and filtering by category, price, and promotion status.
- Product sorting by newest, best-selling, low price, and high price.
- Product pagination.
- Member profile page.
- Logout flow.

## Role Mapping

```txt
R1: Admin
R2: User / Member
R3: Moderator
```

The TimeLux storefront is designed for authenticated users with role `R2`.

## API Integration

The product UI is connected to the backend product API:

```txt
GET /api/products
GET /api/products/:id
```

Axios is configured in:

```txt
src/util/axios.customize.js
```

The access token is automatically attached to protected API requests:

```txt
Authorization: Bearer <accessToken>
```

## Product Images

Product image files are stored as frontend static assets:

```txt
src/assets/stitch_timelux_watch_store_ui/
```

The backend stores `imageKeys`, and the frontend maps those keys to local image assets in:

```txt
src/redux/slices/productSlice.js
```

Example:

```js
imageKeys: ['hero', 'diamond', 'chronograph']
```

## Project Structure

```txt
src/pages/HomePage.jsx
```

Product home page with hero section, filters, product list, pagination, member information, and logout.

```txt
src/pages/ProductDetailPage.jsx
```

Product detail page with gallery, stock status, sold quantity, quantity selector, specifications, and similar products.

```txt
src/pages/UserProfilePage.jsx
```

Member profile page for role `R2`.

```txt
src/redux/slices/productSlice.js
```

Redux slice for product state and asynchronous API calls:

```js
fetchProducts
fetchProductById
```

```txt
src/redux/slices/authSlice.js
```

Redux slice for authentication, registration, OTP, forgot password, profile, logout, and refresh token state.

```txt
src/util/api.js
```

Centralized API functions.

```txt
src/util/axios.customize.js
```

Axios instance and request interceptor configuration.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Default frontend URL:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

## Backend Proxy

The Vite development server proxies API requests to the backend:

```txt
/api   -> http://localhost:8088
/user  -> http://localhost:8088
/admin -> http://localhost:8088
```

The backend server should be running on port `8088` during local development.

## Suggested Test Flow

1. Start the backend server.
2. Start the frontend development server.
3. Log in with an active role `R2` account.
4. Open the storefront at `/home`.
5. Test product search, filters, sorting, and pagination.
6. Open a product detail page.
7. Test image switching and quantity selection.
8. Open the member profile page.
9. Log out.
