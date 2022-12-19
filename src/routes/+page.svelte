<script lang="ts">
	type LinkToken = {
		link_token: string;
		expiration: string;
		request_id: string;
	};

	const linkPlaid = async () => {
		try {
			const res = await fetch('./api/link', {
				method: 'POST',
				body: JSON.stringify({
					user: 'test'
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!res.ok) throw new Error('Link Token Request Failed!');

			const linkToken: LinkToken = await res.json();
			const handler = window.Plaid.create({
				token: linkToken.link_token,
				onSuccess: getTransactions,
				// onLoad: () => {},
				onExit: (err, metadata) => {}
				// onEvent: (eventName, metadata) => {}
			});
			handler.open();
		} catch (error) {
			console.log(error);
		}
	};

	const getTransactions = async (public_token: string) => {
		try {
			const res = await fetch(`./api/transactions?public_token=${public_token}`);
			const body = await res.text();
			console.log(body);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={linkPlaid}>Link Accounts</button>
