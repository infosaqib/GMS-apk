# GMS App - Ginning Management System

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://gms-apk.vercel.app/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://www.mongodb.com/)

**GMS App** is a comprehensive Ginning Management System designed to streamline cotton ginning business operations. It provides a complete solution for managing products, clients, vendors, invoicing, and order tracking.

🔗 **Live Preview**: [https://gms-apk.vercel.app/](https://gms-apk.vercel.app/)

---

## 📋 Table of Contents

- [Features](#-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 📊 Dashboard

- Real-time overview of business metrics
- Track revenue, expenses, sales, and purchases
- Monitor total clients, vendors, and products
- Visual representation of business performance

### 🛍️ Product Management

- Create and manage cotton products with detailed pricing
- Support for multiple processing stages:
  - **Cleaning Price** - Cotton cleaning charges
  - **Granding Price** - Grading service charges
  - **Chrai Price** - Processing fees
  - **Pinjai Price** - Ginning charges
  - **Filling Price** - Filling service charges
  - **Stitching Price** - Packaging charges
- Stock quantity tracking
- Automatic total price calculation
- Update and delete products

### 👥 Client Management

- Complete client database with contact information
- Store client details: Name, Father's Name, Contact, CNIC
- Client profile pages with invoice history
- Auto-fill client information when creating invoices
- View all client transactions in one place

### 🏭 Vendor Management

- Maintain vendor database for raw material purchases
- Track vendor information and contact details
- Vendor profile pages with purchase history
- Manage vendor invoices and payments

### 📄 Client Invoice System

- Create detailed invoices for client orders
- Automatic invoice ID generation (7-digit unique ID)
- Barcode generation for each invoice (Code128 format)
- Track multiple order details:
  - Customer information
  - Product/Item name
  - Item weight
  - Process-wise pricing breakdown
  - Total price calculation
- Invoice status tracking:
  - **Ordered** - New order received
  - **Working** - Order in processing
  - **Packed** - Order ready for delivery
  - **Delivered** - Order completed
- Print-friendly invoice view
- Update and delete invoices

### 🧾 Vendor Invoice System

- Record purchases from vendors
- Track product purchases with quantity and pricing
- Calculate total purchase costs
- Maintain complete purchase history
- Price per unit tracking

### 📦 Order Tracking

- Real-time order status monitoring
- Track all client orders in one place
- Filter and search orders
- Visual status indicators
- Quick access to order details

### 🔍 Search & Filter

- Quick search functionality across all modules
- Filter invoices by client/vendor
- Auto-complete for client/vendor details
- Intelligent data matching

---

## 🔄 How It Works

### 1. **Product Setup**

First, set up your products with their processing prices:

```
1. Navigate to Products page
2. Click "Add Product"
3. Enter product name and pricing for each process stage
4. System automatically calculates total price
5. Product is now available for invoicing
```

### 2. **Client/Vendor Registration**

Register your clients and vendors:

```
1. Go to Clients or Vendors page
2. Click "Add Client/Vendor"
3. Fill in details (Name, Father's Name, Contact, CNIC)
4. Save to database
5. Profile is created with dedicated history page
```

### 3. **Creating Client Invoices (Sales)**

Generate invoices for client orders:

```
1. Navigate to Invoices page (Sell Tab)
2. Click "Create Invoice"
3. Enter or auto-fill client details (search by contact)
4. Select product from dropdown
5. Enter item weight and cutting weight
6. System calculates remaining weight
7. Select applicable processes (cleaning, granding, etc.)
8. System auto-calculates total price
9. Submit invoice
10. Unique 7-digit ID and barcode are generated
11. Invoice status set to "Ordered"
```

### 4. **Creating Vendor Invoices (Purchases)**

Record purchases from vendors:

```
1. Navigate to Invoices page (Buy Tab)
2. Click "Create Purchase Invoice"
3. Enter or auto-fill vendor details
4. Enter product name, quantity, and price per unit
5. System calculates total purchase cost
6. Submit to record purchase
```

### 5. **Tracking Orders**

Monitor order status in real-time:

```
1. Go to Tracking page
2. View all client orders with current status
3. Click on any order to view details
4. Update status as order progresses
5. Mark as Delivered when completed
```

### 6. **Invoice Management**

View and manage all invoices:

```
1. Click on any invoice card
2. View detailed invoice with barcode
3. Print invoice for client
4. Update order status
5. Delete if needed
```

### 7. **Profile Pages**

Access complete client/vendor history:

```
1. Click "Profile" button on any client/vendor card
2. View personal information
3. See complete invoice/purchase history
4. Filter transactions by date or status
5. Access individual invoice details
```

---

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend

- **EJS** - Templating engine
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Client-side scripting

### Security & Middleware

- **Helmet** - HTTP security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting
- **Morgan** - HTTP request logger
- **DOMPurify** - XSS protection

### Features & Utilities

- **bwip-js** - Barcode generation (Code128)
- **QRCode** - QR code generation
- **dotenv** - Environment variable management
- **rotating-file-stream** - Log rotation

### Development Tools

- **Nodemon** - Auto-restart on file changes
- **PostCSS & Autoprefixer** - CSS processing

---

## 🏗️ System Architecture

```
GMS-App/
│
├── app.js                          # Application entry point
├── config/
│   └── db.config.js               # MongoDB connection setup
│
├── models/                         # Mongoose schemas
│   ├── product.model.js           # Product schema with pricing
│   ├── client.model.js            # Client information schema
│   ├── vendor.model.js            # Vendor information schema
│   ├── client-invoice.model.js    # Client order/invoice schema
│   └── vendor-invoice.model.js    # Vendor purchase schema
│
├── controllers/                    # Business logic
│   ├── product.controller.js      # Product CRUD operations
│   ├── client.controller.js       # Client management
│   ├── vendor.controller.js       # Vendor management
│   ├── client-invoice.controller.js  # Client invoice operations
│   └── vendor-invoice.controller.js  # Vendor invoice operations
│
├── routes/                         # API routes
│   ├── product.route.js           # Product endpoints
│   ├── client.route.js            # Client endpoints
│   ├── vendor.route.js            # Vendor endpoints
│   ├── client-invoice.route.js    # Client invoice endpoints
│   └── vendor-invoice.route.js    # Vendor invoice endpoints
│
├── middlewares/                    # Custom middleware
│   ├── errorHandler.middleware.js # Error handling
│   └── logger.middleware.js       # Request logging
│
├── services/
│   └── ApiError.service.js        # Custom error handling
│
├── public/                         # Static assets
│   ├── javascripts/               # Client-side JS
│   └── icons/                     # SVG icons
│
└── views/                          # EJS templates
    ├── index.ejs                  # Dashboard
    ├── product.ejs                # Products page
    ├── client.ejs                 # Clients page
    ├── vendor.ejs                 # Vendors page
    ├── invoice.ejs                # Invoices page
    └── tracking.ejs               # Order tracking page
```

### Data Flow

1. **Client Request** → Express Server
2. **Route Handler** → Validates request
3. **Controller** → Business logic execution
4. **Model** → Database interaction (MongoDB)
5. **Response** → JSON data or rendered view
6. **Client Update** → Real-time UI updates

---

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/gms-apk.git
   cd gms-apk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. **Build Tailwind CSS**

   ```bash
   npm run build
   ```

5. **Start the development server**

   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Production Build

For production deployment:

```bash
NODE_ENV=production npm start
```

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/gms-app
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gms-app

# Application Settings
SESSION_SECRET=your_secret_key_here
```

---

## 🌐 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Clients

- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get client by ID
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Vendors

- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get vendor by ID
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Client Invoices

- `GET /api/client-invoices` - Get all client invoices
- `GET /api/client-invoices/:id` - Get invoice by ID
- `GET /api/client-invoices?client=:clientId` - Get invoices by client
- `POST /api/client-invoices` - Create new invoice
- `PUT /api/client-invoices/:id` - Update invoice
- `DELETE /api/client-invoices/:id` - Delete invoice

### Vendor Invoices

- `GET /api/vendor-invoices` - Get all vendor invoices
- `GET /api/vendor-invoices/:id` - Get invoice by ID
- `GET /api/vendor-invoices?vendor=:vendorId` - Get invoices by vendor
- `POST /api/vendor-invoices` - Create new invoice
- `PUT /api/vendor-invoices/:id` - Update invoice
- `DELETE /api/vendor-invoices/:id` - Delete invoice

### Response Format

All API endpoints return data in the following format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

---

## 📸 Screenshots


### Dashboard

![Dashboard](https://github.com/infosaqib/GMS-apk/blob/master/public/images/dashboard.png)

### Product Management

![Products](https://github.com/infosaqib/GMS-apk/blob/master/public/images/products.png)

### Invoice Creation

![Invoice](https://github.com/infosaqib/GMS-apk/blob/master/public/images/invoice.png)

### Order Tracking

![Tracking](https://github.com/infosaqib/GMS-apk/blob/master/public/images/tracking.png)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Developed with ❤️ for the cotton ginning industry

---

## 🐛 Bug Reports & Feature Requests

If you encounter any bugs or have feature requests, please:

1. Check existing issues
2. Create a new issue with detailed description
3. Include steps to reproduce (for bugs)
4. Add screenshots if applicable

---

## 📞 Support

For support and questions:

- Create an issue in the repository
- Visit the [live demo](https://gms-apk.vercel.app/) to see the app in action

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for efficiency and ease of use
- Tailored for cotton ginning business operations

---

**⭐ Star this repository if you find it helpful!**
