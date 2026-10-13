// The demo brands the docs site shows (decisions/0023 in the library). Kept
// out of the 'use client' demo module so server pages can read the list too:
// a value exported from a client module reaches the server as a reference,
// not an array.
export const DEMO_BRANDS = ['demo-cool', 'demo-warm', 'demo-soft'] as const
