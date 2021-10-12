import { useCallback } from 'react';
import { mutate } from 'swr';

const API_URL = '/api/book-suggestions';

type SuggestionPayload = {
  success: boolean;
};

async function sendBookSuggestion(
  title: string,
  author: string,
  reason: string
): Promise<SuggestionPayload> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, reason }),
  });

  return {
    success: res.status === 200,
  };
}

const useBookSuggestions = () => {
  const sendSuggestion = useCallback(
    (
      title: string,
      author: string,
      reason: string
    ): Promise<SuggestionPayload> =>
      mutate(API_URL, sendBookSuggestion(title, author, reason), false),
    []
  );

  return {
    sendSuggestion,
  };
};

export default useBookSuggestions;
