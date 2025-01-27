import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import type { APIContext } from 'astro';
import { parseTime } from '../utils/time';

export async function GET(context: APIContext) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title.toString(),
			author: post.data.author,
			categories: post.data.tags,
			description: post.data.summary.toString(),
			pubDate: new Date(parseTime(post.data.pubDate).epochMilliseconds),
			link: `/blog/${post.id}/`,
		})),
	});
}
