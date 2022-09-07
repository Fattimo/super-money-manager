<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		const handler = window.Plaid.create({
			token: 'link-sandbox-b0dd6e40-c7dc-48cc-b534-d297d5300f29',
			onSuccess: (public_token, metadata) => {},
			onLoad: () => {},
			onExit: (err, metadata) => {},
			onEvent: (eventName, metadata) => {}
		});
		handler.open();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button />
