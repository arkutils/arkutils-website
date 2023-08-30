<script lang="ts" context="module">
	export type Server = {
		link: string;
		name: string;
		map?: string;
		pvpve?: string;
		mode?: string;
		region?: string;
		flags?: string[];
		number: string;
	};
</script>

<script lang="ts">
	import Download from '$lib/imgs/Download.svelte';
	import ServerDatabase from '$lib/imgs/toolicons/ServerDatabase.svelte';

	export let servers: Server[];
	// export let date: Date;

	const ANY = 'Any';

	let searchTerm = ''; // @hmr:keep
	let mapFilter = ANY; // @hmr:keep
	let pvpveFilter = ANY; // @hmr:keep
	let modeFilter = ANY; // @hmr:keep
	let regionFilter = ANY; // @hmr:keep
	let flagsFilters = [ANY]; // @hmr:keep

	$: noFilters =
		searchTerm === '' &&
		mapFilter === ANY &&
		pvpveFilter === ANY &&
		modeFilter === ANY &&
		regionFilter === ANY &&
		flagsFilters.length === 1 &&
		flagsFilters[0] === ANY;

	let results: Server[] = servers;

	const maps = [
		...new Set(servers.map((server) => server.map).filter((map) => map !== undefined) as string[]),
	];
	const modes = [
		...new Set(servers.map((server) => server.mode).filter((mode) => mode !== undefined) as string[]),
	];
	const regions = [
		...new Set(
			servers.map((server) => server.region).filter((region) => region !== undefined) as string[]
		),
	];
	const flags = [
		...new Set(
			servers
				.map((server) => server.flags)
				.filter((flags) => flags !== undefined)
				.flatMap((flags) => flags)
				.filter((filter) => filter !== 'b') as string[]
		),
	];

	$: (searchTerm, mapFilter, pvpveFilter, modeFilter, regionFilter, flagsFilters),
		(results = filterResults());

	function resetFilters() {
		mapFilter = ANY;
		pvpveFilter = ANY;
		modeFilter = ANY;
		regionFilter = ANY;
		flagsFilters = [ANY];
	}

	$: console.log('modeFilter', modeFilter);

	function filterResults(): Server[] {
		const words = searchTerm.toLowerCase().split(' ');

		results = [];
		for (const server of servers) {
			if (mapFilter !== ANY && server.map !== mapFilter) continue;
			if (pvpveFilter !== ANY && server.pvpve !== pvpveFilter) continue;
			if (modeFilter !== ANY && server.mode !== modeFilter) continue;
			if (regionFilter !== ANY && server.region !== regionFilter) continue;
			if (flagsFilters.includes(ANY)) {
				if (flagsFilters.length > 1) continue;
			} else {
				if (!server.flags) continue;
				if (!flagsFilters.every((flag) => server.flags?.includes(flag))) continue;
			}
			if (!words.every((word) => server.name.toLowerCase().includes(word))) continue;
			results.push(server);
		}

		return results;
	}
</script>

<div class="flex flex-row flex-wrap gap-4">
	<div class="form-control grow">
		<label class="label" for="search">
			<span class="label-text">Enter any search terms</span>
		</label>
		<input
			type="text"
			placeholder="Search..."
			id="search"
			class="input input-bordered w-full"
			bind:value={searchTerm}
		/>
	</div>
	<div class="form-control grow">
		<label class="label" for="map-select">
			<span class="label-text">Map</span>
		</label>
		<select class="select select-bordered" id="map-select" bind:value={mapFilter}>
			<option selected>Any</option>
			{#each maps as map}
				<option>{map}</option>
			{/each}
		</select>
	</div>

	<button class="btn self-end" on:click={resetFilters}>Clear filters</button>
</div>

<div class="flex flex-row flex-wrap gap-x-4 mt-2 bigselects w-full items-stretch">
	<div class="form-control basis-32 grow min-w-fit">
		<label class="label" for="pvpve-select">
			<span class="label-text">PVP / PVE</span>
		</label>
		<select
			class="select select-bordered h-[11rem]"
			id="pvpve-select"
			size="10"
			bind:value={pvpveFilter}
		>
			<option selected>Any</option>
			{#each ['PVP', 'PVE'] as pvpve}
				<option>{pvpve}</option>
			{/each}
		</select>
	</div>
	<div class="form-control basis-32 grow min-w-fit">
		<label class="label" for="region-select">
			<span class="label-text">Region</span>
		</label>
		<select
			class="select select-bordered h-[11rem]"
			id="region-select"
			size="10"
			bind:value={regionFilter}
		>
			<option selected>Any</option>
			{#each regions as region}
				<option>{region}</option>
			{/each}
		</select>
	</div>
	<div class="form-control basis-48 grow min-w-fit">
		<label class="label" for="mode-select">
			<span class="label-text">Type</span>
		</label>
		<select class="select select-bordered h-[11rem]" id="mode-select" size="10" bind:value={modeFilter}>
			<option selected>Any</option>
			{#each modes as mode}
				<option>{mode}</option>
			{/each}
		</select>
	</div>
	<div class="form-control basis-48 grow min-w-fit">
		<label class="label" for="flags-select">
			<span class="label-text">Flags</span>
		</label>
		<select
			class="select select-bordered !h-[11rem]"
			id="flags-select"
			size={flags.length + 2}
			multiple
			bind:value={flagsFilters}
		>
			<option selected>Any</option>
			{#each flags as flag}
				<option>{flag}</option>
			{/each}
		</select>
	</div>
</div>

{#if noFilters}
	<p class="text-center text-2xl mt-8">Search for the server name or set a filter</p>
{:else if results.length === 0}
	<p class="text-center text-2xl mt-8">No results found. Filters too strict?</p>
{:else}
	<div class="flex flex-row items-center">
		<div class="overflow-x-auto mt-8 mx-auto">
			<table class="table">
				<thead>
					<tr>
						<th class="flex flex-row items-center gap-2">
							<span class="text-[32px] -my-1">
								<ServerDatabase />
							</span>
							Server Name
						</th>
						<th />
						<th />
					</tr>
				</thead>
				<tbody class="">
					{#each results as result}
						<tr>
							<td class="bg-base-200/30">{result.name}</td>
							<td class="sm:w-16 bg-base-200/30" />
							<td class="bg-base-200/50">
								<a href={result.link} class="text-[24px]">
									<Download />
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}

<style lang="postcss">
	.bigselects select {
		overflow-y: hidden;
		accent-color: pink !important;
	}
</style>
