import { error, type RequestHandler } from '@sveltejs/kit';
import type { ItemAccessTokenInvalidateRequest, ItemPublicTokenExchangeRequest } from 'plaid';
import { client } from '$lib/api/PlaidClient';

export const GET: RequestHandler = async ({ url }) => {
	const publicToken = url.searchParams.get('public_token');
	if (!publicToken) {
		throw error(400, 'no public token provided');
	}

	const { accessToken, itemId } = await exchangePublicToken(publicToken);

	await invalidateToken(accessToken);
	return new Response(publicToken);
};

const exchangePublicToken = async (publicToken: string) => {
	const exchangeRequest: ItemPublicTokenExchangeRequest = {
		public_token: publicToken
	};
	try {
		const response = await client.itemPublicTokenExchange(exchangeRequest);
		return {
			accessToken: response.data.access_token,
			itemId: response.data.item_id
		};
	} catch (err) {
		throw error(400, 'error getting plaid access token');
	}
};

const invalidateToken = async (accessToken: string) => {
	const invalidateRequest: ItemAccessTokenInvalidateRequest = {
		access_token: accessToken
	};
	try {
		const response = await client.itemAccessTokenInvalidate(invalidateRequest);
		// Store the new access_token in a persistent, secure datastore
		const accessToken = response.data.new_access_token;
	} catch (error) {
		// handle error
	}
};
