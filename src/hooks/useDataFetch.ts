// packages/ui/src/hooks/useDataFetch.ts

"use client";

import { useState, useCallback } from 'react';

export const useDataFetch = <T>(
  initialData: T | null,
  mockDataSource: T
) => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockDataSource);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [mockDataSource]);

  // Initial fetch on mount
  useState(() => {
    fetchData();
  });

  return { data, loading, error, fetchData };
};