import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

const API_URL = '/api/views/';

type ViewsPayload = {
  views: number | undefined;
};

async function getPostViews(slug: string): Promise<ViewsPayload> {
  const res = await fetch(API_URL + slug);
  return res.json();
}

async function updatePostViews(slug: string): Promise<ViewsPayload> {
  const res = await fetch(API_URL + slug, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();

  return {
    views: data.views,
  };
}

const usePostViews = (slug: string) => {
  const { data } = useSWR(slug ? `${slug}/views` : null, () =>
    getPostViews(slug),
    {
      revalidateOnFocus: false,
    }
  );

  const increment = useCallback(() => {
    mutate(`${slug}/views`, updatePostViews(slug));
  }, [slug]);

  return { views: data?.views, increment };
};

export default usePostViews;
