<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { siteTitle, titleSplitter, defaultMetaDescription } from '$lib/config';

	export let title: string | null;
	export let description: string | null;

	const location = $page.url.pathname.replace(/^\/+/, '');
	const baseUrl = new URL($page.url);
	baseUrl.pathname = base;

	const pageTitle = title === null ? siteTitle : `${title}${titleSplitter}${siteTitle}`;
	const pageDescription = description ?? defaultMetaDescription;
	const previewImage = `${baseUrl}previews/${location || 'index'}.jpg`;
	const previewTwitterImage = `${baseUrl}previews/${location || 'index'}-twitter.jpg`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:image:alt" content={pageTitle} />

	<meta name="description" content={pageDescription} />
	<meta property="og:description" content={pageDescription} />

	<meta property="og:url" content={`${baseUrl}${location}`} />
	<meta property="og:image:url" content={previewImage} />
	<meta property="og:image:secure_url" content={previewImage} />
	<meta property="og:image" content={previewImage} />

	<meta name="twitter:image" content={previewTwitterImage} />
</svelte:head>
