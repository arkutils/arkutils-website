<script>
	let crafting_skill = 100;
	let saddle_armor = 25;
	let result = null;
	let saddle_armor_min = null;

	function calculate() {
		// Get the user's Crafting Skill and Saddles Armor from the input fields
		//let crafting_skill = document.getElementById('crafting_skill').value;
		//let saddle_armor = document.getElementById('saddle_armor').value;

		// Remove any % characters from the input strings
		//crafting_skill = crafting_skill.replace('%', '');
		//saddle_armor = saddle_armor.replace('%', '');

		// Try to convert the input strings to integers and floats
		// If the user enters letters instead of numbers, this will raise a SyntaxError
		/* try {
			crafting_skill = parseInt(crafting_skill);
			saddle_armor = parseFloat(saddle_armor);
		} catch (err) {
			if (err instanceof SyntaxError) {
				document.getElementById('result').innerHTML = 'This is not a valid number';
				return;
			}
			// TODO: Handle other errors
		}
 */
		// Calculate the extra armor value
		// This is the saddle armor minus 25
		const extra_armor = saddle_armor - 25;

		// Calculate the boost percentage
		// This is the crafting skill minus 100, divided by 20
		const boost_percentage = (crafting_skill - 100) / 20;

		// Calculate the boost value
		// This is the extra armor multiplied by the boost percentage
		const boost_value = extra_armor * (boost_percentage / 100);

		// Calculate the maximum armor value
		// This is the saddle armor plus the boost value
		const max_armor = saddle_armor + boost_value;

		// Set the result text to the maximum armor value
		// document.getElementById('result').innerHTML = 'The maximum armor you can get is ' + max_armor;

		result = max_armor;
		saddle_armor_min = saddle_armor;
	}
</script>

<h1>Maximum Armor Calculator</h1>

<p>
	Enter your Crafting Skill and Saddles Armor below, then click the "Calculate" button to get your maximum
	armor value.
</p>

<label class="label">
	<span class="label-text">Crafting Skill</span>
	<input
		placeholder="Crafting Skill"
		min="100"
		type="number"
		class="input input-bordered input-secondary w-full max-w-xs"
		bind:value={crafting_skill}
	/>
</label>
<br />
<label class="label">
	<span class="label-text">Saddle Armor</span>
	<input
		placeholder="Saddle Armor"
		min="20"
		type="number"
		class="input input-bordered input-secondary w-full max-w-xs"
		bind:value={saddle_armor}
	/>
</label>
<br />
<button class="btn btn-active btn-secondary mb-4" on:click={calculate}>Calculate</button>

{#if result}
	<div class="alert alert-success shadow-lg my-4">
		<div>
			<span>The MINIMUM armor you can get is {saddle_armor_min}.</span>
		</div>
	</div>
	<div class="alert alert-success shadow-lg my-4">
		<div>
			<span>The MAXIMUM armor you can get is {result}.</span>
		</div>
	</div>
{/if}

<style>
</style>
