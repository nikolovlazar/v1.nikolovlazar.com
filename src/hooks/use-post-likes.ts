import { useState, useEffect, useCallback } from 'react';
import useSWR, { mutate } from 'swr';

const API_URL = '/api/likes/';

type LikesPayload = {
  likes: number;
};

async function getPostLikes(slug: string): Promise<LikesPayload> {
  const res = await fetch(API_URL + slug);
  return res.json();
}

async function updatePostLikes(
  slug: string,
  numberOfLikes: number
): Promise<LikesPayload> {
  const res = await fetch(API_URL + slug, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numberOfLikes }),
  });
  const data = await res.json();

  return {
    likes: data.likes,
  };
}

const usePostLikes = (slug: string) => {
  const { data } = useSWR(slug ? `${slug}/likes` : null, () =>
    getPostLikes(slug)
  );

  const increment = useCallback(
    (numberOfLikes: number) => {
      mutate(`${slug}/likes`, updatePostLikes(slug, numberOfLikes), false);
    },
    [slug]
  );

  return { likes: data?.likes ?? 0, increment };
};

export default usePostLikes;
