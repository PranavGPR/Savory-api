import j2s from 'joi-to-swagger';

import { createCustomerSchema, updateCustomerSchema } from 'validators/admin';
import { createCustomerExample, updateCustomerExample } from 'constants/admin';

const { swagger: createCustomerSwagger } = j2s(createCustomerSchema);
const { swagger: updateCustomerSwagger } = j2s(updateCustomerSchema);

export default {
	'/admin/customer/create': {
		post: {
			tags: ['Admin/Customer'],
			summary: 'Create a customer as an admin',
			description: 'Create customer after logging in as an admin',
			responses: {
				200: {
					description: `Customer created`,
					content: 'application/json'
				},
				400: {
					description: 'Error in inserting the values'
				},
				401: {
					description: 'Access denied'
				},
				500: {
					description: 'Internal Server error'
				}
			},
			parameters: [
				{
					in: 'path',
					name: 'token',
					description: 'Token for Authorization',
					required: true
				},
				{
					in: 'body',
					name: 'body',
					description: 'Details needed to create a customer',
					required: true,
					schema: {
						...createCustomerSwagger,
						example: createCustomerExample
					}
				}
			]
		}
	},
	'/admin/customer/all': {
		get: {
			tags: ['Admin/Customer'],
			summary: 'Get all customers',
			description: 'After logging in, get all customer',
			responses: {
				200: {
					description: 'Details of the customers',
					content: 'application/json'
				},
				400: {
					description: 'Enter a valid id'
				},
				401: {
					description: 'Access Denied'
				},
				404: {
					description: 'No records found'
				},
				500: {
					description: 'Internal Server error'
				}
			},
			parameters: [
				{
					in: 'header',
					name: 'Authorization',
					description: 'Token for authorization',
					required: true,
					type: 'string'
				}
			]
		}
	}
};
