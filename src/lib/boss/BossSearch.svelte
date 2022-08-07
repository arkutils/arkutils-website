<script>
	import { boss_data, difficulties } from './data';

	import SearchBox from './SearchBox.svelte';
</script>

<SearchBox>
	<li class="hover:bg-base-200 px-4 py-1 rounded breadcrumbs" slot="result" let:result>
		{@const map = boss_data[result.map]}
		{@const isLore = map.isLore}
		<ul>
			{#if result.type === 'map'}
				<li>
					<a href="/boss/{result.map}">
						<img
							src="/imgs/maps/{map.icon}"
							class="filter-dim"
							class:lore={isLore}
							aria-disabled="true"
							alt="{map.display} Icon"
							width="32"
							height="32"
						/>
						{map.display}
					</a>
				</li>
			{:else if result.type === 'boss'}
				{@const boss = map.bosses[result.boss]}
				<li>
					<img
						src="/imgs/maps/{map.icon}"
						class="filter-dim"
						class:lore={isLore}
						aria-disabled="true"
						alt=""
						width="32"
						height="32"
					/>
					{map.display}
				</li>
				{#if result.difficulty}
					<li>{boss.display}</li>
					<li>
						<a href="/boss/{result.map}/{result.boss}-{result.difficulty}">
							{difficulties[result.difficulty].display}
						</a>
					</li>
				{:else}
					<li>
						<a href="/boss/{result.map}/{result.boss}">
							{boss.display}
						</a>
					</li>
				{/if}
			{:else if result.type === 'item'}
				{@const item = result.item}
				{@const boss = map.bosses[result.boss]}
				<li>{item.name}</li>
				<li>
					<img
						src="/imgs/maps/{map.icon}"
						class="filter-dim"
						class:lore={isLore}
						aria-disabled="true"
						alt=""
						width="32"
						height="32"
					/>
					{map.display}
				</li>
				{#if result.difficulty}
					<li>{boss.display}</li>
					<li>
						<a href="/boss/{result.map}/{result.boss}-{result.difficulty}">
							{difficulties[result.difficulty].display}
						</a>
					</li>
				{:else}
					<li>
						<a href="/boss/{result.map}/{result.boss}">
							{boss.display}
						</a>
					</li>
				{/if}
			{/if}
		</ul>
	</li>

	<div slot="noResults" class="h-40 bg-pink-500">No results found!</div>
</SearchBox>
