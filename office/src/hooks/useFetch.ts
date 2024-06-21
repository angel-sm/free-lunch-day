import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T>(url: string, refresh?: boolean): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refresh]);

  return { data, loading, error };
};

export default useFetch;
