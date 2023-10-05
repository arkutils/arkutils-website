<script lang="ts">
	import ServerDownloads, { type Server } from '../ServerDownloads.svelte';
	import serverData from './servers.json';

	const servers = serverData.servers as Server[];
</script>

<h3 class="text-secondary text-3xl mt-8 mb-4">October 2023 (Final) List</h3>

<ServerDownloads {servers} />
