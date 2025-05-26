import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import { OptionsWithUri } from 'request';

// Main node class
export class FacturaDirecta implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FacturaDirecta',
		name: 'facturaDirecta',
		icon: 'file:facturadirecta.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integrate with FacturaDirecta API for billing and accounting operations',
		defaults: {
			name: 'FacturaDirecta',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'facturaDirectaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Client',
						value: 'client',
						description: 'Operations on clients',
					},
					{
						name: 'Invoice',
						value: 'invoice',
						description: 'Operations on invoices',
					},
					{
						name: 'Product',
						value: 'product',
						description: 'Operations on products',
					},
					{
						name: 'Provider',
						value: 'provider',
						description: 'Operations on providers',
					},
					{
						name: 'Expense',
						value: 'expense',
						description: 'Operations on expenses',
					},
					{
						name: 'Recurring Invoice',
						value: 'recurringInvoice',
						description: 'Operations on recurring invoices',
					},
					{
						name: 'Payment Method',
						value: 'paymentMethod',
						description: 'Operations on payment methods',
					},
				],
				default: 'client',
			},

			// CLIENT OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['client'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new client',
						action: 'Create a client',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a client',
						action: 'Delete a client',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a client',
						action: 'Get a client',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many clients',
						action: 'Get many clients',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a client',
						action: 'Update a client',
					},
				],
				default: 'create',
			},

			// INVOICE OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new invoice',
						action: 'Create an invoice',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an invoice',
						action: 'Delete an invoice',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an invoice',
						action: 'Get an invoice',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many invoices',
						action: 'Get many invoices',
					},
					{
						name: 'Send',
						value: 'send',
						description: 'Send invoice by email',
						action: 'Send an invoice',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an invoice',
						action: 'Update an invoice',
					},
				],
				default: 'create',
			},

			// PRODUCT OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new product',
						action: 'Create a product',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a product',
						action: 'Delete a product',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a product',
						action: 'Get a product',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many products',
						action: 'Get many products',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a product',
						action: 'Update a product',
					},
					{
						name: 'Update Stock',
						value: 'updateStock',
						description: 'Update product stock',
						action: 'Update product stock',
					},
				],
				default: 'create',
			},

			// PROVIDER OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['provider'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new provider',
						action: 'Create a provider',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a provider',
						action: 'Delete a provider',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a provider',
						action: 'Get a provider',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many providers',
						action: 'Get many providers',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a provider',
						action: 'Update a provider',
					},
				],
				default: 'create',
			},

			// EXPENSE OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['expense'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new expense',
						action: 'Create an expense',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an expense',
						action: 'Delete an expense',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an expense',
						action: 'Get an expense',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many expenses',
						action: 'Get many expenses',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an expense',
						action: 'Update an expense',
					},
				],
				default: 'create',
			},

			// RECURRING INVOICE OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['recurringInvoice'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a recurring invoice',
						action: 'Create a recurring invoice',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a recurring invoice',
						action: 'Delete a recurring invoice',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a recurring invoice',
						action: 'Get a recurring invoice',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many recurring invoices',
						action: 'Get many recurring invoices',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a recurring invoice',
						action: 'Update a recurring invoice',
					},
				],
				default: 'create',
			},

			// PAYMENT METHOD OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['paymentMethod'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a payment method',
						action: 'Create a payment method',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a payment method',
						action: 'Delete a payment method',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a payment method',
						action: 'Get a payment method',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many payment methods',
						action: 'Get many payment methods',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a payment method',
						action: 'Update a payment method',
					},
				],
				default: 'create',
			},

			// ID FIELD FOR GET/UPDATE/DELETE OPERATIONS
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete', 'send', 'updateStock'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the resource',
			},

			// CLIENT FIELDS
			{
				displayName: 'Client Data',
				name: 'clientData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Client name',
						required: true,
					},
					{
						displayName: 'Tax Code',
						name: 'taxCode',
						type: 'string',
						default: '',
						description: 'Tax identification number',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
						description: 'Client email address',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Client phone number',
					},
					{
						displayName: 'Address',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Client address',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Client city',
					},
					{
						displayName: 'Postal Code',
						name: 'postalCode',
						type: 'string',
						default: '',
						description: 'Client postal code',
					},
					{
						displayName: 'Province',
						name: 'province',
						type: 'string',
						default: '',
						description: 'Client province',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Client country',
					},
				],
			},

			// INVOICE FIELDS
			{
				displayName: 'Invoice Data',
				name: 'invoiceData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Client ID',
						name: 'clientId',
						type: 'string',
						default: '',
						required: true,
						description: 'ID of the client for this invoice',
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
						description: 'Invoice date',
					},
					{
						displayName: 'Due Date',
						name: 'dueDate',
						type: 'dateTime',
						default: '',
						description: 'Invoice due date',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Invoice description',
					},
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number',
						default: 0,
						typeOptions: {
							minValue: 0,
						},
						description: 'Invoice amount',
					},
					{
						displayName: 'Tax Rate',
						name: 'taxRate',
						type: 'number',
						default: 21,
						typeOptions: {
							minValue: 0,
							maxValue: 100,
						},
						description: 'Tax rate percentage',
					},
					{
						displayName: 'Send Email',
						name: 'sendEmail',
						type: 'boolean',
						default: false,
						description: 'Whether to send the invoice by email automatically',
					},
				],
			},

			// PRODUCT FIELDS
			{
				displayName: 'Product Data',
				name: 'productData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Product Code',
						name: 'productCode',
						type: 'string',
						default: '',
						required: true,
						description: 'Unique product code',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						required: true,
						description: 'Product description',
					},
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						default: 0,
						typeOptions: {
							minValue: 0,
						},
						description: 'Product price',
					},
					{
						displayName: 'Discount Rate',
						name: 'discountRate',
						type: 'number',
						default: 0,
						typeOptions: {
							minValue: 0,
							maxValue: 100,
						},
						description: 'Discount rate percentage',
					},
					{
						displayName: 'Purchase Price',
						name: 'purchasePrice',
						type: 'number',
						default: 0,
						typeOptions: {
							minValue: 0,
						},
						description: 'Product purchase price',
					},
					{
						displayName: 'Provider ID',
						name: 'providerId',
						type: 'string',
						default: '',
						description: 'ID of the provider for this product',
					},
					{
						displayName: 'Stock Enabled',
						name: 'stockEnabled',
						type: 'boolean',
						default: false,
						description: 'Whether stock control is enabled for this product',
					},
					{
						displayName: 'Stock',
						name: 'stock',
						type: 'number',
						default: 0,
						typeOptions: {
							minValue: 0,
						},
						description: 'Current stock quantity',
					},
				],
			},

			// STOCK UPDATE FIELDS
			{
				displayName: 'Stock Data',
				name: 'stockData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['updateStock'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Stock',
						name: 'stock',
						type: 'number',
						default: 0,
						required: true,
						typeOptions: {
							minValue: 0,
						},
						description: 'New stock quantity',
					},
					{
						displayName: 'Stock Movement Type',
						name: 'stockMovementType',
						type: 'options',
						options: [
							{
								name: 'Increase',
								value: 'increase',
							},
							{
								name: 'Decrease',
								value: 'decrease',
							},
							{
								name: 'Set',
								value: 'set',
							},
						],
						default: 'set',
						description: 'Type of stock movement',
					},
					{
						displayName: 'Reason',
						name: 'reason',
						type: 'string',
						default: '',
						description: 'Reason for stock movement',
					},
				],
			},

			// PROVIDER FIELDS
			{
				displayName: 'Provider Data',
				name: 'providerData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['provider'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						required: true,
						description: 'Provider name',
					},
					{
						displayName: 'Tax Code',
						name: 'taxCode',
						type: 'string',
						default: '',
						description: 'Tax identification number',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
						description: 'Provider email address',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Provider phone number',
					},
					{
						displayName: 'Address',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Provider address',
					},
				],
			},

			// EXPENSE FIELDS
			{
				displayName: 'Expense Data',
				name: 'expenseData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['expense'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Provider ID',
						name: 'providerId',
						type: 'string',
						default: '',
						description: 'ID of the provider for this expense',
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
						description: 'Expense date',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						required: true,
						description: 'Expense description',
					},
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number',
						default: 0,
						required: true,
						typeOptions: {
							minValue: 0,
						},
						description: 'Expense amount',
					},
					{
						displayName: 'Tax Rate',
						name: 'taxRate',
						type: 'number',
						default: 21,
						typeOptions: {
							minValue: 0,
							maxValue: 100,
						},
						description: 'Tax rate percentage',
					},
				],
			},

			// RECURRING INVOICE FIELDS
			{
				displayName: 'Recurring Invoice Data',
				name: 'recurringInvoiceData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['recurringInvoice'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Client ID',
						name: 'clientId',
						type: 'string',
						default: '',
						required: true,
						description: 'ID of the client for this recurring invoice',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						required: true,
						description: 'Recurring invoice description',
					},
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number',
						default: 0,
						required: true,
						typeOptions: {
							minValue: 0,
						},
						description: 'Recurring invoice amount',
					},
					{
						displayName: 'Frequency',
						name: 'frequency',
						type: 'options',
						options: [
							{
								name: 'Monthly',
								value: 'monthly',
							},
							{
								name: 'Quarterly',
								value: 'quarterly',
							},
							{
								name: 'Yearly',
								value: 'yearly',
							},
						],
						default: 'monthly',
						description: 'Billing frequency',
					},
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						description: 'Start date for recurring invoices',
					},
					{
						displayName: 'Active',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Whether the recurring invoice is active',
					},
				],
			},

			// PAYMENT METHOD FIELDS
			{
				displayName: 'Payment Method Data',
				name: 'paymentMethodData',
				type: 'collection',
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['paymentMethod'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						required: true,
						description: 'Payment method name',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Payment method description',
					},
					{
						displayName: 'Active',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Whether the payment method is active',
					},
				],
			},

			// LIMIT FOR GET ALL OPERATIONS
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				default: 100,
				description: 'Max number of results to return',
			},

			// RETURN ALL OPTION
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to the limit',
			},

			// FILTERS
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Custom Query Parameters',
						name: 'customQuery',
						type: 'string',
						default: '',
						placeholder: 'name=example&email=test@example.com',
						description: 'Additional query parameters as key=value pairs separated by &',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		
		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('facturaDirectaApi');
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let response: IDataObject | IDataObject[];

				if (resource === 'client') {
					response = await handleClientOperations.call(this, i, operation, credentials);
				} else if (resource === 'invoice') {
					response = await handleInvoiceOperations.call(this, i, operation, credentials);
				} else if (resource === 'product') {
					response = await handleProductOperations.call(this, i, operation, credentials);
				} else if (resource === 'provider') {
					response = await handleProviderOperations.call(this, i, operation, credentials);
				} else if (resource === 'expense') {
					response = await handleExpenseOperations.call(this, i, operation, credentials);
				} else if (resource === 'recurringInvoice') {
					response = await handleRecurringInvoiceOperations.call(this, i, operation, credentials);
				} else if (resource === 'paymentMethod') {
					response = await handlePaymentMethodOperations.call(this, i, operation, credentials);
				} else {
					throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`);
				}

				if (Array.isArray(response)) {
					returnData.push(...response);
				} else {
					returnData.push(response);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ 
						json: { error: error.message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

// Helper function to make API requests
async function facturaDirectaApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: string,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	credentials: IDataObject,
): Promise<any> {
	const { accountName, apiToken } = credentials;

	const options: OptionsWithUri = {
		method,
		headers: {
			'Accept': 'application/xml',
			'Content-Type': 'application/xml',
		},
		auth: {
			username: apiToken as string,
			password: 'x',
		},
		qs,
		uri: `https://${accountName}.facturadirecta.com/api${resource}`,
		json: false,
		timeout: 30000,
	};

	if (Object.keys(body).length !== 0) {
		options.body = buildXmlBody(body);
	}

	try {
		const response = await this.helpers.request(options);
		return parseXmlResponse(response);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Helper function to build XML body
function buildXmlBody(data: IDataObject, rootElement?: string): string {
	let xml = '<?xml version="1.0" encoding="UTF-8"?>';
	
	function escapeXml(value: any): string {
		if (value === null || value === undefined) {
			return '';
		}
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function buildElement(obj: any, parentKey?: string): string {
		let result = '';
		
		if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
			for (const [key, value] of Object.entries(obj)) {
				if (value !== undefined && value !== null && value !== '') {
					if (typeof value === 'object' && !Array.isArray(value)) {
						result += `<${key}>${buildElement(value)}</${key}>`;
					} else {
						result += `<${key}><![CDATA[${escapeXml(value)}]]></${key}>`;
					}
				}
			}
		}
		
		return result;
	}
	
	if (rootElement) {
		xml += `<${rootElement}>${buildElement(data)}</${rootElement}>`;
	} else {
		// Auto-detect root element based on data structure
		const firstKey = Object.keys(data)[0];
		const firstValue = data[firstKey];
		xml += `<${firstKey}>${buildElement(firstValue)}</${firstKey}>`;
	}
	
	return xml;
}

// Helper function to parse XML response
function parseXmlResponse(xmlString: string): IDataObject {
	try {
		// Remove XML declaration and clean up
		const cleanXml = xmlString.replace(/<\?xml[^>]*\?>/, '').trim();
		
		// Simple XML to JSON conversion (in production, use xml2js or similar)
		const result: IDataObject = {};
		
		// Handle CDATA sections
		const cdataRegex = /<!\[CDATA\[(.*?)\]\]>/g;
		const processedXml = cleanXml.replace(cdataRegex, '$1');
		
		// Extract elements
		const elementRegex = /<([^/>]+)>([^<]*)<\/\1>/g;
		let match;
		
		while ((match = elementRegex.exec(processedXml)) !== null) {
			const [, tagName, content] = match;
			if (content.trim()) {
				result[tagName] = content.trim();
			}
		}
		
		// If no elements found, return raw response
		if (Object.keys(result).length === 0) {
			return { rawResponse: cleanXml };
		}
		
		return result;
	} catch (error) {
		return { rawResponse: xmlString, parseError: error.message };
	}
}

// Client operations handler
async function handleClientOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	let endpoint = '';
	let method = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'create':
			endpoint = '/clients.xml';
			method = 'POST';
			const clientData = this.getNodeParameter('clientData', index) as IDataObject;
			body = {
				client: {
					n: clientData.name,
					taxCode: clientData.taxCode,
					email: clientData.email,
					phone: clientData.phone,
					address: clientData.address,
					city: clientData.city,
					postalCode: clientData.postalCode,
					province: clientData.province,
					country: clientData.country,
				},
			};
			break;

		case 'update':
			const clientId = this.getNodeParameter('id', index) as string;
			endpoint = `/clients/${clientId}.xml`;
			method = 'PUT';
			const updateData = this.getNodeParameter('clientData', index) as IDataObject;
			body = {
				client: {
					id: clientId,
					n: updateData.name,
					taxCode: updateData.taxCode,
					email: updateData.email,
					phone: updateData.phone,
					address: updateData.address,
					city: updateData.city,
					postalCode: updateData.postalCode,
					province: updateData.province,
					country: updateData.country,
				},
			};
			break;

		case 'get':
			const getClientId = this.getNodeParameter('id', index) as string;
			endpoint = `/clients/${getClientId}.xml`;
			method = 'GET';
			break;

		case 'getAll':
			endpoint = '/clients.xml';
			method = 'GET';
			const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
			const limit = this.getNodeParameter('limit', index, 100) as number;
			const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
			
			if (!returnAll) {
				qs.limit = limit;
			}
			
			if (filters.customQuery) {
				const queryParams = (filters.customQuery as string).split('&');
				queryParams.forEach(param => {
					const [key, value] = param.split('=');
					if (key && value) {
						qs[key.trim()] = value.trim();
					}
				});
			}
			break;

		case 'delete':
			const deleteClientId = this.getNodeParameter('id', index) as string;
			endpoint = `/clients/${deleteClientId}.xml`;
			method = 'DELETE';
			break;

		default:
			throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
	}

	return await facturaDirectaApiRequest.call(this, method, endpoint, body, qs, credentials);
}

// Invoice operations handler
async function handleInvoiceOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	let endpoint = '';
	let method = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'create':
			endpoint = '/invoices.xml';
			method = 'POST';
			const invoiceData = this.getNodeParameter('invoiceData', index) as IDataObject;
			body = {
				invoice: {
					client: { id: invoiceData.clientId },
					date: invoiceData.date,
					dueDate: invoiceData.dueDate,
					description: invoiceData.description,
					amount: invoiceData.amount,
					taxRate: invoiceData.taxRate,
					sendEmail: invoiceData.sendEmail,
				},
			};
			break;

		case 'update':
			const invoiceId = this.getNodeParameter('id', index) as string;
			endpoint = `/invoices/${invoiceId}.xml`;
			method = 'PUT';
			const updateData = this.getNodeParameter('invoiceData', index) as IDataObject;
			body = {
				invoice: {
					id: invoiceId,
					client: { id: updateData.clientId },
					date: updateData.date,
					dueDate: updateData.dueDate,
					description: updateData.description,
					amount: updateData.amount,
					taxRate: updateData.taxRate,
				},
			};
			break;

		case 'get':
			const getInvoiceId = this.getNodeParameter('id', index) as string;
			endpoint = `/invoices/${getInvoiceId}.xml`;
			method = 'GET';
			break;

		case 'getAll':
			endpoint = '/invoices.xml';
			method = 'GET';
			const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
			const limit = this.getNodeParameter('limit', index, 100) as number;
			const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
			
			if (!returnAll) {
				qs.limit = limit;
			}
			
			if (filters.customQuery) {
				const queryParams = (filters.customQuery as string).split('&');
				queryParams.forEach(param => {
					const [key, value] = param.split('=');
					if (key && value) {
						qs[key.trim()] = value.trim();
					}
				});
			}
			break;

		case 'send':
			const sendInvoiceId = this.getNodeParameter('id', index) as string;
			endpoint = `/invoices/${sendInvoiceId}/send.xml`;
			method = 'POST';
			break;

		case 'delete':
			const deleteInvoiceId = this.getNodeParameter('id', index) as string;
			endpoint = `/invoices/${deleteInvoiceId}.xml`;
			method = 'DELETE';
			break;

		default:
			throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
	}

	return await facturaDirectaApiRequest.call(this, method, endpoint, body, qs, credentials);
}

// Product operations handler
async function handleProductOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	let endpoint = '';
	let method = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'create':
			endpoint = '/products.xml';
			method = 'POST';
			const productData = this.getNodeParameter('productData', index) as IDataObject;
			body = {
				product: {
					productCode: productData.productCode,
					description: productData.description,
					price: productData.price,
					discountRate: productData.discountRate,
					purchasePrice: productData.purchasePrice,
					provider: productData.providerId ? { id: productData.providerId } : undefined,
					stockEnabled: productData.stockEnabled,
					stock: productData.stock,
				},
			};
			break;

		case 'update':
			const productId = this.getNodeParameter('id', index) as string;
			endpoint = `/products/${productId}.xml`;
			method = 'PUT';
			const updateData = this.getNodeParameter('productData', index) as IDataObject;
			body = {
				product: {
					id: productId,
					productCode: updateData.productCode,
					description: updateData.description,
					price: updateData.price,
					discountRate: updateData.discountRate,
					purchasePrice: updateData.purchasePrice,
					provider: updateData.providerId ? { id: updateData.providerId } : undefined,
					stockEnabled: updateData.stockEnabled,
					stock: updateData.stock,
				},
			};
			break;

		case 'updateStock':
			const stockProductId = this.getNodeParameter('id', index) as string;
			endpoint = `/products/${stockProductId}/stock.xml`;
			method = 'PUT';
			const stockData = this.getNodeParameter('stockData', index) as IDataObject;
			body = {
				stockMovement: {
					stock: stockData.stock,
					type: stockData.stockMovementType,
					reason: stockData.reason,
				},
			};
			break;

		case 'get':
			const getProductId = this.getNodeParameter('id', index) as string;
			endpoint = `/products/${getProductId}.xml`;
			method = 'GET';
			break;

		case 'getAll':
			endpoint = '/products.xml';
			method = 'GET';
			const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
			const limit = this.getNodeParameter('limit', index, 100) as number;
			const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
			
			if (!returnAll) {
				qs.limit = limit;
			}
			
			if (filters.customQuery) {
				const queryParams = (filters.customQuery as string).split('&');
				queryParams.forEach(param => {
					const [key, value] = param.split('=');
					if (key && value) {
						qs[key.trim()] = value.trim();
					}
				});
			}
			break;

		case 'delete':
			const deleteProductId = this.getNodeParameter('id', index) as string;
			endpoint = `/products/${deleteProductId}.xml`;
			method = 'DELETE';
			break;

		default:
			throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
	}

	return await facturaDirectaApiRequest.call(this, method, endpoint, body, qs, credentials);
}

// Provider operations handler
async function handleProviderOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	let endpoint = '';
	let method = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'create':
			endpoint = '/providers.xml';
			method = 'POST';
			const providerData = this.getNodeParameter('providerData', index) as IDataObject;
			body = {
				provider: {
					n: providerData.name,
					taxCode: providerData.taxCode,
					email: providerData.email,
					phone: providerData.phone,
					address: providerData.address,
				},
			};
			break;

		case 'update':
			const providerId = this.getNodeParameter('id', index) as string;
			endpoint = `/providers/${providerId}.xml`;
			method = 'PUT';
			const updateData = this.getNodeParameter('providerData', index) as IDataObject;
			body = {
				provider: {
					id: providerId,
					n: updateData.name,
					taxCode: updateData.taxCode,
					email: updateData.email,
					phone: updateData.phone,
					address: updateData.address,
				},
			};
			break;

		case 'get':
			const getProviderId = this.getNodeParameter('id', index) as string;
			endpoint = `/providers/${getProviderId}.xml`;
			method = 'GET';
			break;

		case 'getAll':
			endpoint = '/providers.xml';
			method = 'GET';
			const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
			const limit = this.getNodeParameter('limit', index, 100) as number;
			const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
			
			if (!returnAll) {
				qs.limit = limit;
			}
			
			if (filters.customQuery) {
				const queryParams = (filters.customQuery as string).split('&');
				queryParams.forEach(param => {
					const [key, value] = param.split('=');
					if (key && value) {
						qs[key.trim()] = value.trim();
					}
				});
			}
			break;

		case 'delete':
			const deleteProviderId = this.getNodeParameter('id', index) as string;
			endpoint = `/providers/${deleteProviderId}.xml`;
			method = 'DELETE';
			break;

		default:
			throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
	}

	return await facturaDirectaApiRequest.call(this, method, endpoint, body, qs, credentials);
}

// Expense operations handler
async function handleExpenseOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	let endpoint = '';
	let method = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'create':
			endpoint = '/expenses.xml';
			method = 'POST';
			const expenseData = this.getNodeParameter('expenseData', index) as IDataObject;
			body = {
				expense: {
					provider: expenseData.providerId ? { id: expenseData.providerId } : undefined,
					date: expenseData.date,
					description: expenseData.description,
					amount: expenseData.amount,
					taxRate: expenseData.taxRate,
				},
			};
			break;

		case 'update':
			const expenseId = this.getNodeParameter('id', index) as string;
			endpoint = `/expenses/${expenseId}.xml`;
			method = 'PUT';
			const updateData = this.getNodeParameter('expenseData', index) as IDataObject;
			body = {
				expense: {
					id: expenseId,
					provider: updateData.providerId ? { id: updateData.providerId } : undefined,
					date: updateData.date,
					description: updateData.description,
					amount: updateData.amount,
					taxRate: updateData.taxRate,
				},
			};
			break;

		case 'get':
			const getExpenseId = this.getNodeParameter('id', index) as string;
			endpoint = `/expenses/${getExpenseId}.xml`;
			method = 'GET';
			break;

		case 'getAll':
			endpoint = '/expenses.xml';
			method = 'GET';
			const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
			const limit = this.getNodeParameter('limit', index, 100) as number;
			const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
			
			if (!returnAll) {
				qs.limit = limit;
			}
			
			if (filters.customQuery) {
				const queryParams = (filters.customQuery as string).split('&');
				queryParams.forEach(param => {
					const [key, value] = param.split('=');
					if (key && value) {
						qs[key.trim()] = value.trim();
					}
				});
			}
			break;

		case 'delete':
			const deleteExpenseId = this.getNodeParameter('id', index) as string;
			endpoint = `/expenses/${deleteExpenseId}.xml`;
			method = 'DELETE';
			break;

		default:
			throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
	}

	return await facturaDirectaApiRequest.call(this, method, endpoint, body, qs, credentials);
}

// Recurring Invoice operations handler
async function handleRecurringInvoiceOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	let endpoint = '';
	let method = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'create':
			endpoint = '/recurring-invoices.xml';
			method = 'POST';
			const recurringData = this.getNodeParameter('recurringInvoiceData', index) as IDataObject;
			body = {
				recurringInvoice: {
					client: { id: recurringData.clientId },
					description: recurringData.description,
					amount: recurringData.amount,
					frequency: recurringData.frequency,
					startDate: recurringData.startDate,
					active: recurringData.active,
				},
			};
			break;

		case 'update':
			const recurringId = this.getNodeParameter('id', index) as string;
			endpoint = `/recurring-invoices/${recurringId}.xml`;
			method = 'PUT';
			const updateData = this.getNodeParameter('recurringInvoiceData', index) as IDataObject;
			body = {
				recurringInvoice: {
					id: recurringId,
					client: { id: updateData.clientId },
					description: updateData.description,
					amount: updateData.amount,
					frequency: updateData.frequency,
					startDate: updateData.startDate,
					active: updateData.active,
				},
			};
			break;

		case 'get':
			const getRecurringId = this.getNodeParameter('id', index) as string;
			endpoint = `/recurring-invoices/${getRecurringId}.xml`;
			method = 'GET';
			break;

		case 'getAll':
			endpoint = '/recurring-invoices.xml';
			method = 'GET';
			const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
			const limit = this.getNodeParameter('limit', index, 100) as number;
			const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
			
			if (!returnAll) {
				qs.limit = limit;
			}
			
			if (filters.customQuery) {
				const queryParams = (filters.customQuery as string).split('&');
				queryParams.forEach(param => {
					const [key, value] = param.split('=');
					if (key && value) {
						qs[key.trim()] = value.trim();
					}
				});
			}
			break;

		case 'delete':
			const deleteRecurringId = this.getNodeParameter('id', index) as string;
			endpoint = `/recurring-invoices/${deleteRecurringId}.xml`;
			method = 'DELETE';
			break;

		default:
			throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
	}

	return await facturaDirectaApiRequest.call(this, method, endpoint, body, qs, credentials);
}

// Payment Method operations handler
async function handlePaymentMethodOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	let endpoint = '';
	let method = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'create':
			endpoint = '/payment-methods.xml';
			method = 'POST';
			const paymentData = this.getNodeParameter('paymentMethodData', index) as IDataObject;
			body = {
				paymentMethod: {
					name: paymentData.name,
					description: paymentData.description,
					active: paymentData.active,
				},
			};
			break;

		case 'update':
			const paymentId = this.getNodeParameter('id', index) as string;
			endpoint = `/payment-methods/${paymentId}.xml`;
			method = 'PUT';
			const updateData = this.getNodeParameter('paymentMethodData', index) as IDataObject;
			body = {
				paymentMethod: {
					id: paymentId,
					name: updateData.name,
					description: updateData.description,
					active: updateData.active,
				},
			};
			break;

		case 'get':
			const getPaymentId = this.getNodeParameter('id', index) as string;
			endpoint = `/payment-methods/${getPaymentId}.xml`;
			method = 'GET';
			break;

		case 'getAll':
			endpoint = '/payment-methods.xml';
			method = 'GET';
			const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
			const limit = this.getNodeParameter('limit', index, 100) as number;
			const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
			
			if (!returnAll) {
				qs.limit = limit;
			}
			
			if (filters.customQuery) {
				const queryParams = (filters.customQuery as string).split('&');
				queryParams.forEach(param => {
					const [key, value] = param.split('=');
					if (key && value) {
						qs[key.trim()] = value.trim();
					}
				});
			}
			break;

		case 'delete':
			const deletePaymentId = this.getNodeParameter('id', index) as string;
			endpoint = `/payment-methods/${deletePaymentId}.xml`;
			method = 'DELETE';
			break;

		default:
			throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
	}

	return await facturaDirectaApiRequest.call(this, method, endpoint, body, qs, credentials);
} 
