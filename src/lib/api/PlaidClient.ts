import { PLAID_CLIENT_ID, PLAID_SANDBOX_SECRET } from '$env/static/private';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

class PlaidClient {
	client!: PlaidApi;
	private static _instance?: PlaidClient;

	constructor() {
		if (PlaidClient._instance) {
			return PlaidClient._instance;
		}
		PlaidClient._instance = this;

		this.client = this.setupClient();
	}

	setupClient() {
		const configuration = new Configuration({
			basePath: PlaidEnvironments.sandbox,
			baseOptions: {
				headers: {
					'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
					'PLAID-SECRET': PLAID_SANDBOX_SECRET
				}
			}
		});

		console.log(configuration);

		const client = new PlaidApi(configuration);
		return client;
	}
}

export const client = new PlaidClient().client;
