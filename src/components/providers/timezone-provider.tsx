"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface TimezoneContextType {
  timezone: string;
  setTimezone: (timezone: string) => void;
  userTimezone: string;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [timezone, setTimezone] = useState<string>("UTC");
  const [userTimezone, setUserTimezone] = useState<string>("UTC");

  useEffect(() => {
    // Detect user's timezone from browser
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(detectedTimezone);
    
    // Set initial timezone to user's timezone
    setTimezone(detectedTimezone);
  }, []);

  const value = {
    timezone,
    setTimezone,
    userTimezone,
  };

  return (
    <TimezoneContext.Provider value={value}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error("useTimezone must be used within a TimezoneProvider");
  }
  return context;
}
