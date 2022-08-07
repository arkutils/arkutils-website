<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { defaultMetaDescription, siteTitle, titleSplitter } from '$lib/config';

	export let title: string[] | string | null;
	export let description: string | null;
	export let nopreview = false;

	const location = $page.url.pathname.replace(/^\/+/, '');
	const baseUrl = new URL($page.url);
	baseUrl.pathname = base;

	const pageTitle = constructTitle();
	const pageDescription = description ?? defaultMetaDescription;
	const previewImage = `${baseUrl}previews/${location || 'index'}.jpg`;
	const previewTwitterImage = `${baseUrl}previews/${location || 'index'}-twitter.jpg`;

	function constructTitle(): string {
		if (Array.isArray(title)) {
			return [...title, siteTitle].join(titleSplitter);
		} else if (typeof title === 'string') {
			return [title, siteTitle].join(titleSplitter);
		} else {
			return siteTitle;
		}
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:image:alt" content={pageTitle} />

	<meta name="description" content={pageDescription} />
	<meta property="og:description" content={pageDescription} />

	<meta property="og:url" content={`${baseUrl}${location}`} />
	{#if !nopreview}
		<meta property="og:image:url" content={previewImage} />
		<meta property="og:image:secure_url" content={previewImage} />
		<meta property="og:image" content={previewImage} />

		<meta name="twitter:image" content={previewTwitterImage} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
