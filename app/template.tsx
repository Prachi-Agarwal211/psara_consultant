"use client";

import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const ViewTransitionComp = (React as unknown as { ViewTransition?: React.ComponentType<{ enter?: string; exit?: string; default?: string; children: React.ReactNode }> }).ViewTransition;

  if (ViewTransitionComp) {
    return (
      <ViewTransitionComp enter="page-enter" exit="page-exit" default="none">
        <div className="psara-page-transition-wrapper min-h-full w-full">
          {children}
        </div>
      </ViewTransitionComp>
    );
  }

  return (
    <div
      className="psara-page-transition-wrapper min-h-full w-full"
      style={{ viewTransitionName: "page-content" }}
    >
      {children}
    </div>
  );
}
