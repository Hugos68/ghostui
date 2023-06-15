<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createAccordion } from '../../../../lib/factories/accordion/accordion.js';

	const { accordionTrigger, accordionPanel, isExpanded } = createAccordion({
		allowMultiOpen: false
	});

	const accordions = [
		{
			label: 'Accessibilty',
			content: 'Every accordion is fully accessible, no need to worry about that.'
		},
		{
			label: 'Styling',
			content: 'Give it any look you want, we handle the logic.'
		},
		{
			label: 'Animated',
			content: 'Integrates with svelte transitions beautifully.'
		},
		{
			label: 'Customize',
			content: `
                <p>You can fully customize the accordion, for example a form:</p>
                <form class="flex flex-col w-full mx-auto max-w-lg p-4">
                    <h2 class="h2 text-center">Login</h2>
                    <label class="my-2" for="email">Email</label>
                    <input class="input" type="email" name="email" placeholder="Email" />
                    <label class="my-2" for="password">Password</label>
                    <input class="input" type="password" name="password" placeholder="Password" />
                    <p class="my-4 text-center">Don't have an acount yet? <span class="underline text-blue-600">Click here to sign up.</span></p>
                    <button class="btn bg-blue-400">Submit</button>
                </form>
            `
		}
	];
</script>

<h1 class="h1">Accordion</h1>
<ul class="flex flex-col">
	{#each accordions as { label, content }}
		<li class="w-full">
			<button
				class="w-full text-start bg-white text-black p-3"
				use:accordionTrigger={{ panelLabel: label }}><h3 class="text-lg">{label}</h3></button
			>
			{#if $isExpanded(label)}
				<div
					class="bg-white bg-opacity-80 text-black p-3"
					use:accordionPanel={{ label }}
					transition:slide
				>
					<p>{@html content}</p>
				</div>
			{/if}
		</li>
	{/each}
</ul>
