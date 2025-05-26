import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class FacturaDirectaApi implements ICredentialType {
	name = 'facturaDirectaApi';
	displayName = 'FacturaDirecta API';
	documentationUrl = 'https://www.facturadirecta.com/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'Account Name',
			name: 'accountName',
			type: 'string',
			default: '',
			placeholder: 'your-account-name',
			description: 'Your FacturaDirecta account name (from your-account-name.facturadirecta.com)',
			required: true,
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API Token from Configuration > API and External Applications',
			required: true,
		},
	];
} 
