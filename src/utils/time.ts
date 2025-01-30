import { Temporal } from "@js-temporal/polyfill";

function lt(one: Temporal.Duration, other: Temporal.DurationLike): boolean {
	return Temporal.Duration.compare(one, other) < 0
}

export function printTime(datetime: Temporal.ZonedDateTime): string {
	const delta = datetime.until(Temporal.Now.zonedDateTimeISO())
	if (lt(delta, { minutes: 1 })) return 'now'
	if (lt(delta, { minutes: 2 })) return '1 minute ago'
	if (lt(delta, { hours: 1 })) return `${delta.minutes} minutes ago`
	if (lt(delta, { hours: 2 })) return `1 hour ago`
	if (lt(delta, { days: 1 })) return `${delta.hours} hours ago`
	if (lt(delta, { days: 2 })) return `yesterday`
	if (lt(delta, { days: 7 })) return `${delta.round({ smallestUnit: 'days' }).days} days ago`
	const date = datetime.toPlainDate().toString();
	const time = datetime.toPlainTime().toString({ smallestUnit: 'minutes' });
	return `at ${date} ${time}`
}

export function parseTime(string: string): Temporal.ZonedDateTime {
	return Temporal.ZonedDateTime.from(string)
}

export function isValidTime(string: string): boolean {
		try { parseTime(string); return true } catch { return false }
}