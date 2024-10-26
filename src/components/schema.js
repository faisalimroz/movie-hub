import { z } from 'zod';

export const MovieSchema = z.object({
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  poster_path: z.string().nullable(),
});

export const CreditsSchema = z.object({
  cast: z.array(
    z.object({
      cast_id: z.number(),
      name: z.string(),
      character: z.string(),
    })
  ),
});
