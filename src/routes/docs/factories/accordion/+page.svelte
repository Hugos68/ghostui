<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createAccordion } from '../../../../lib/factories/accordion/accordion.js';
	import Preview from '../../../../lib/components/Preview.svelte';
	import Codeblock from '../../../../lib/components/Codeblock.svelte';

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
                <p class="italic">Note: We don't actually recommend putting forms inside accordions, this is merely a showcase of what the accordion is capable of</p>
            `
		}
	];

    import code from './example.txt?raw';
</script>

<section class="my-10">
    <h1 class="h1">Accordion</h1>

    <Preview>
        <ul class="flex flex-col [&>*:nth-child(1)]:border-b-2 [&>*:nth-child(2)]:border-b-2 [&>*:nth-child(3)]:border-b-2">
            {#each accordions as { label, content }}
                <li>
                    <button
                        class="w-full text-start bg-white hover:bg-opacity-95 text-black p-3"
                        use:accordionTrigger={{ panelLabel: label }}><h3 class="text-lg">{label}</h3></button
                    >
                    {#if $isExpanded(label)}
                        <div
                            class="bg-white bg-opacity-80 text-black p-3"
                            use:accordionPanel={{ label }}
                            transition:slide|local
                        >
                            <p>{@html content}</p>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    </Preview>
</section>


<h2 class="h2">Usage</h2>

<p class="text-lg">To implement the Accordion component in your UI you will need to use the <code>createAccordion</code> method to create the neccescary functionality:</p>
<Codeblock language="html" {code} />

