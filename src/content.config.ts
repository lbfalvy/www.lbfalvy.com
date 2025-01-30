import { Temporal } from '@js-temporal/polyfill';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { isValidTime } from './utils/time';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		image: z.string().optional(),
		pubDate: z.string().refine(isValidTime),
		updatedDate: z.string().refine(isValidTime).optional(),
		unlisted: z.boolean().optional(),
		author: z.string(),
		tags: z.array(z.string())
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string(),
		url: z.string(),
		image: z.string().optional(),
	})
})

export const collections = { blog, projects };
