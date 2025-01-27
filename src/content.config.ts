import { Temporal } from '@js-temporal/polyfill';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { isValidTime } from './utils/time';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		image: z.string().optional(),
		// Transform string to ZonedDateTime object
		pubDate: z.string().refine(isValidTime),
		updatedDate: z.string().refine(isValidTime).optional(),
		unlisted: z.boolean().optional(),
		author: z.string(),
		tags: z.array(z.string())
	}),
});

export const collections = { blog };
