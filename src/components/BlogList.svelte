<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { onMount } from "svelte";
  import { SvelteMap } from "svelte/reactivity";
  import { parseTime, printTime } from "../utils/time";
  import Time from "./Time.svelte";

  interface Props {
    posts: CollectionEntry<"blog">[];
  }
  let { posts }: Props = $props();
  
  let allTags = $derived([...new Set(posts.flatMap(item => item.data.tags))]);

  let selectedTags = $state<SvelteMap<string, boolean>>();

  onMount(() => {
    const url = new URL(window.location.href);
    const tagsQry = url.searchParams.get('tags');
    const defaultTags = tagsQry ? new Set(decodeURIComponent(tagsQry).split('+')) : new Set();
    selectedTags = new SvelteMap(allTags.map(tag => [tag, defaultTags.has(tag)]));
  })

  $effect(() => {
    if (!selectedTags) return;
    const newTagsQry = encodeURIComponent(
      [...selectedTags.entries()].filter(([_, v]) => v).map(([k, _]) => k).join('+')
    );
    const url = new URL(window.location.href);
    if (newTagsQry == url.searchParams.get("tags")) return;
    if (newTagsQry == "") url.searchParams.delete("tags");
    else url.searchParams.set("tags", newTagsQry);
    window.history.pushState(null, "", url.toString());
  })

  let isFiltered = $derived(selectedTags && [...selectedTags.values()].includes(true));
  let filteredPosts = $derived(isFiltered
    ? posts.filter(p => !p.data.unlisted && p.data.tags.some(t => selectedTags!.get(t)))
    : posts.filter(p => !p.data.unlisted));
  let shownPosts = $derived(filteredPosts.toReversed())
</script>

<div class="lg:flex flex-row-reverse justify-between items-start">
  <div class="m-2 p-2 bg-side-bg lg:float-right lg:max-w-80 lg:mr-4">
    <span class="inline-block m-0.5 pl-2 italic">filter:</span>
    {#each allTags as tag}
      <button
        onclick={() => {
          console.log("TRoggled tag")
          selectedTags!.set(tag, !selectedTags!.get(tag))
        }}
        class={[
          "m-0.5 rounded-4xl emph-bg px-2 cursor-pointer border-2 border-solid",
          selectedTags?.get(tag) && "border-gray-400"
        ]}
      >
        {tag}
      </button>
    {/each}
  </div>
  <main class="max-w-[650px]">
    {#each shownPosts as post}
      <article>
        <a href={`/blog/${post.id}`}>
          <div class="
            lg:grid grid-cols-[auto_min-content_min-content]
            m-1 p-2 hover:bg-shade
          ">
            <h2 class="font-bold">{post.data.title}</h2>
            <address class="inline-block post-meta col-start-2 md:ml-3">
              {post.data.author}
            </address>
            <div class="inline-block post-meta col-start-3 lg:ml-1">
              <Time datetime={post.data.pubDate} />
            </div>
            <div class="col-span-3">{post.data.summary}</div>
          </div>
        </a>
      </article>
    {/each}
  </main>
</div>