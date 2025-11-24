import { useState, useEffect } from 'react';

export const useCarsDb = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const jsonPath = '/db/Cars.json';

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (jsonPath) {
      fetchData(jsonPath);
    }
  }, [jsonPath]);

  return { data, loading, error };
};
