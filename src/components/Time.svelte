<script lang="ts">
import type { Temporal } from "@js-temporal/polyfill";
import { printTime } from "../utils/time";

interface Props {
  time: Temporal.ZonedDateTime
}

const { time }: Props = $props();
</script>

<time datetime={time.toString()} class="post-meta inline-block col-start-3">
  {printTime(time)}
</time>