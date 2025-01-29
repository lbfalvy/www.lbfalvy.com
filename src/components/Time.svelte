<script lang="ts">
import type { Temporal } from "@js-temporal/polyfill";
import { parseTime, printTime } from "../utils/time";

interface Props {
  datetime: string
}

const { datetime }: Props = $props();
const time = $derived(parseTime(datetime));
</script>

<time datetime={time.toString()} class="post-meta inline-block col-start-3">
  {printTime(time)}
</time>