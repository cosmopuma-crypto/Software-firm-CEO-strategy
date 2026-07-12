"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/tracking/attribution";

/**
 * Erfasst beim ersten Seitenaufruf der Sitzung Referrer + UTM-Parameter
 * (First-Touch-Attribution, cookie-los). Rendert nichts.
 */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
