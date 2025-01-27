// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import darkPlus from 'shiki/themes/dark-plus.mjs'

import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.lbfalvy.com',
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [mdx({
        shikiConfig: {
            theme: {
                ...darkPlus,
                bg: "var(--color-side-bg)"
            }
        },
        remarkPlugins: [
            [remarkToc, {
                tight: true,
                skip: '.{0}' // Nothing
            }]
        ],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, {
                content: {
                    type: 'element',
                    tagName: 'i',
                    properties: {
                        className: 'linkbtn gg-link'
                    }
                }
            }]
        ]
    }), sitemap(), svelte(), react()],
});