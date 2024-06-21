/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface UsePostState<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
}

const usePost = <T>(url: string) => {
  const [state, setState] = useState<UsePostState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const post = async (postData: any): Promise<void> => {
    setState({ ...state, loading: true });
    try {
      const response: AxiosResponse<T> = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setState({ data: response.data, error: null, loading: false });
    } catch (err) {
      setState({ data: null, error: err as AxiosError, loading: false });
    }
  };

  return { ...state, post };
};

export default usePost;
