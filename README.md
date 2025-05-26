n8n-nodes-facturadirecta
Mostrar imagen
This is an n8n community node that provides integration with the FacturaDirecta API for billing and accounting operations.
n8n is a fair-code licensed workflow automation platform.
FacturaDirecta is an easy accounting software for small business and freelancers.
Features
This node supports the following resources and operations:
Clients

Create, update, get, get many, and delete clients
Manage client information including name, tax code, email, phone, and address

Invoices

Create, update, get, get many, and delete invoices
Send invoices by email
Manage invoice data including client association, dates, amounts, and tax rates

Products

Create, update, get, get many, and delete products
Update product stock levels
Manage product information including codes, descriptions, prices, and stock control

Providers

Create, update, get, get many, and delete providers
Manage provider information including name, tax code, and contact details

Expenses

Create, update, get, get many, and delete expenses
Associate expenses with providers
Manage expense data including dates, amounts, and tax information

Recurring Invoices

Create, update, get, get many, and delete recurring invoices
Set up automated billing with different frequencies (monthly, quarterly, yearly)

Payment Methods

Create, update, get, get many, and delete payment methods
Manage different payment options for your business

Installation
Follow the installation guide in the n8n community nodes documentation.
Manual installation
To install the node locally, you can use:
bashnpm install n8n-nodes-facturadirecta
Community nodes installation

Go to Settings > Community Nodes.
Select Install.
Enter n8n-nodes-facturadirecta as the package name.
Agree to the risks of using community nodes: select I understand the risks of installing unverified code from a public source.
Select Install.

After installing the node, you can use it like any other node. n8n loads it automatically.
Configuration
Credentials
To use this node, you need to configure your FacturaDirecta API credentials:

Go to your FacturaDirecta account
Navigate to Configuration > API and External Applications
Generate an API token if you don't have one
In n8n, create new credentials of type "FacturaDirecta API"
Enter your account name (the subdomain from your-account.facturadirecta.com URL)
Enter your API token

Authentication
The FacturaDirecta API uses HTTP Basic authentication where:

Username: Your API token
Password: Any value (typically "x")

This node handles authentication automatically using the configured credentials.
Usage
Basic Example: Create a Client

Add the FacturaDirecta node to your workflow
Select Client as the resource
Select Create as the operation
Fill in the client data:

Name: "Example Client"
Tax Code: "B12345678"
Email: "client@example.com"
Phone: "+34 123 456 789"
Address: "Main Street 123"
City: "Madrid"
Postal Code: "28001"
Province: "Madrid"
Country: "Spain"



Advanced Example: Create Invoice and Send by Email

First, create a client (as shown above)
Add another FacturaDirecta node
Select Invoice as the resource
Select Create as the operation
Configure the invoice data:

Client ID: Use the ID from the previous step
Date: Current date
Due Date: 30 days from now
Description: "Services rendered"
Amount: 1000.00
Tax Rate: 21
Send Email: true



Working with Products and Stock

Create a provider first
Create a product associated with the provider
Enable stock control and set initial stock
Use the "Update Stock" operation to manage inventory

Example Workflow: Complete Billing Process
mermaidgraph LR
    A[Trigger] --> B[Create Client]
    B --> C[Create Product]
    C --> D[Create Invoice]
    D --> E[Send Invoice]
    E --> F[Update Stock]
API Rate Limits
FacturaDirecta API has the following limits:

5,000 requests per day per account
60 requests per minute per account

The node will return a 503 error if these limits are exceeded.
Data Format
The FacturaDirecta API uses XML format for requests and responses. This node handles the XML conversion automatically, presenting data in JSON format that's familiar to n8n users.
Error Handling
The node includes comprehensive error handling:

API errors are properly formatted and returned
Rate limit errors provide clear messages
Authentication errors guide users to check their credentials
Validation errors highlight missing or incorrect data

Supported Operations
ResourceCreateReadUpdateDeleteSpecial OperationsClients✅✅✅✅-Invoices✅✅✅✅Send by EmailProducts✅✅✅✅Update StockProviders✅✅✅✅-Expenses✅✅✅✅-Recurring Invoices✅✅✅✅-Payment Methods✅✅✅✅-
Development
Prerequisites

Node.js 18.17 or higher
npm

Setup
bash# Clone the repository
git clone https://github.com/gisela-dev/n8n-nodes-facturadirecta.git
cd n8n-nodes-facturadirecta

# Install dependencies
npm install

# Build the node
npm run build

# Watch for changes during development
npm run dev
Testing
bash# Run linting
npm run lint

# Fix linting issues
npm run lintfix
Project Structure
n8n-nodes-facturadirecta/
├── credentials/
│   └── FacturaDirectaApi.credentials.ts
├── nodes/
│   └── FacturaDirecta/
│       ├── FacturaDirecta.node.ts
│       └── facturadirecta.svg
├── dist/                    # Built files
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── gulpfile.js
└── README.md
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

Development Guidelines

Follow TypeScript best practices
Ensure all operations are properly tested
Update documentation for any new features
Follow n8n community node standards

License
This project is licensed under the MIT License - see the LICENSE file for details.
Support
If you encounter any issues or have questions:

Check the FacturaDirecta API documentation
Review the n8n community nodes documentation
Open an issue on GitHub
Contact FacturaDirecta support for API-specific questions

Changelog
v1.0.0

Initial release
Support for all major FacturaDirecta resources
Complete CRUD operations
Automatic XML/JSON conversion
Comprehensive error handling
Rate limit awareness
TypeScript implementation
Compliant with n8n verification guidelines

Roadmap

 Add support for attachments
 Implement webhook triggers
 Add bulk operations
 Support for payroll (nóminas) endpoints
 Enhanced filtering options
 Custom field support
 Multi-language support
 Advanced reporting features

Technical Details
Architecture
The node is built with:

TypeScript for type safety and better development experience
n8n SDK for seamless integration with n8n workflows
XML parsing for FacturaDirecta API compatibility
Comprehensive error handling for production reliability

API Coverage
This node covers the core FacturaDirecta API endpoints:

/api/clients - Client management
/api/invoices - Invoice operations
/api/products - Product catalog
/api/providers - Provider management
/api/expenses - Expense tracking
/api/recurring-invoices - Automated billing
/api/payment-methods - Payment options

Resources

FacturaDirecta Official Website
FacturaDirecta API Documentation
n8n Documentation
n8n Community Forum
GitHub Repository

Author
Gisela Bravo

Email: gisela@giselabravo.com
GitHub: @gisela-dev


Made with ❤️ for the n8n community 
