// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Plaid } from 'react-plaid-link';

// and what to do when importing types
declare global {
	namespace App {
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Window {
			Plaid: Plaid;
		}
	}
}
