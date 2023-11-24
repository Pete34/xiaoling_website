
import { z, defineCollection, reference } from 'astro:content';



// 3. Export a single `collections` object to register your collection(s)
export const collections = {
    'posts': defineCollection({
        type: 'content', // v2.5.0 and later
        schema: () => z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.date(),
            relatedPosts: z.array(reference('posts')).optional(),
            image: z.object({
                url: z.string(),
                alt: z.string()
            }).optional(),
        }),
    }),
    'movies': defineCollection({
        type: 'content', // v2.5.0 and later
        schema: () => z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.date(),
            movie: z.string()
        }),
    }),
};
