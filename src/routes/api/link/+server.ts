import { error, type RequestHandler } from '@sveltejs/kit';
import { CountryCode, Products } from 'plaid';
import { client } from '$lib/api/PlaidClient';

export const GET: RequestHandler = async ({ url }) => {
	const request = {
		user: {
			// This should correspond to a unique id for the current user.
			client_user_id: 'test'
		},
		client_name: 'Plaid Test App',
		products: [Products.Auth],
		language: 'en',
		// webhook: 'https://webhook.example.com',
		// redirect_uri: 'https://domainname.com/oauth-page.html',
		country_codes: [CountryCode.Us]
	};
	try {
		const createTokenResponse = await client.linkTokenCreate(request);
		return new Response(JSON.stringify(createTokenResponse.data));
	} catch (e) {
		console.error(e);
		throw error(400, 'error generating plaid client');
	}
};
