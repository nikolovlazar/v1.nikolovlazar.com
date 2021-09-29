import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

const API_URL = '/api/views/';

type ViewsPayload = {
  views: number;
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
  const { data } = useSWR(slug ?? null, getPostViews);

  const increment = () => {
    mutate(slug, updatePostViews(slug));
  };

  return { views: data?.views ?? 0, increment };
};

export default usePostViews;
