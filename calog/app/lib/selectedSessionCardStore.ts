import { writable } from 'svelte/store'

export const selectedSession = writable<string | undefined>(undefined);

