<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<p>
	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<span style="background-image: urls('{$page.data.session.user.image}')" class="avatar" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.email || $page.data.session.user?.name}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
		<slot />
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<button on:click={() => signIn('github')}>Sign In with GitHub</button>
	{/if}
</p>
