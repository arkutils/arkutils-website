<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="mx-4 sm:mx-8 mt-8">
	<h1 class="text-8xl text-bold text-primary w-full text-center">{$page.status}</h1>

	<div class="flex flex-col sm:flex-row gap-8 max-w-full justify-center items-center">
		<div class="sm:pb-16 flex flex-col gap-2">
			<h2 class="mt-8 text-bold text-primary">Well that's awkward...</h2>
			{#if $page.status === 404}
				<p>We couldn't find the page you were looking for.</p>
			{:else}
				<p>Something went very wrong...</p>
			{/if}
			<p>But we found this Dodo.</p>
			<a
				href="/"
				title="Home"
				class="btn btn-md btn-secondary text-secondary-content hover:text-neutral-focus mt-4"
				>Take me back to safety</a
			>
		</div>
		<img class="w-48 sm:w-64" src="/imgs/dollydodo.webp" width="512" height="485" alt="Dolly's Dodo" />
	</div>
</main>
