---
title: Temporal (New)
sidebar_position: 18
---

# Temporal (New)

Temporal is a modern JavaScript date and time API designed to fix many pain points of the legacy `Date` object.

Reference: [W3Schools JavaScript Temporal](https://www.w3schools.com/js/js_temporal.asp)

## Why Temporal Exists

The legacy `Date` API has several issues:

- It mixes dates, times, time zones, and timestamps in one object.
- Month indexes are zero-based.
- Parsing behavior can be inconsistent.
- Time zone handling is awkward.
- Many methods mutate the existing object.

Temporal provides clearer types for different date and time use cases.

## Common Temporal Types

| Type | Purpose |
| :---- | :---- |
| `Temporal.PlainDate` | Calendar date without time or time zone |
| `Temporal.PlainTime` | Time without date or time zone |
| `Temporal.PlainDateTime` | Date and time without time zone |
| `Temporal.ZonedDateTime` | Date and time with time zone |
| `Temporal.Instant` | Exact point in time |
| `Temporal.Duration` | Length of time |

## Examples

### Plain Date

```js
const date = Temporal.PlainDate.from("2026-07-10");

console.log(date.year);
console.log(date.month);
console.log(date.day);
```

### Plain DateTime

```js
const dateTime = Temporal.PlainDateTime.from("2026-07-10T14:30:00");

console.log(dateTime.toString());
```

### Duration

```js
const duration = Temporal.Duration.from({
  days: 3,
  hours: 4,
});

console.log(duration.toString());
```

## Interview Answer

Temporal is a newer JavaScript API for date and time handling. It improves on `Date` by separating different concepts such as plain dates, times, instants, durations, and time-zone-aware date-times. The main benefit is safer, clearer date-time logic, especially for scheduling, time zones, and calendar calculations.
