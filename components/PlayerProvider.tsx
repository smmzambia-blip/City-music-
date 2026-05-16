'use client';

import { ReactNode } from 'react';

export function PlayerProvider({ children }: { children: ReactNode }) {
  // Can wrap anything else that needs strict client execution context for audio
  return <>{children}</>;
}
