"use client";

import { useSyncExternalStore } from "react";

/** Nothing ever changes, so the subscribe callback never needs to fire. */
const subscribe = () => () => {};

/**
 * True only after hydration. Implemented with `useSyncExternalStore` so the
 * server and client snapshots differ without a setState-in-effect cascade.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
