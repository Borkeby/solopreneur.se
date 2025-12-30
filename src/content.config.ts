import { defineCollection, z } from "astro:content";
import type { ImageFunction } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PLAYBOOKS_PATH = "src/data/playbooks";

const makeSchema = (image: ImageFunction, defaultTags: string[]) =>
    z.object({
        author: z.string().default(SITE.author),
        pubDatetime: z.date(),
        modDatetime: z.date().optional().nullable(),
        title: z.string(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(defaultTags),
        ogImage: image().or(z.string()).optional(),
        description: z.string(),
        canonicalURL: z.string().optional(),
        hideEditPost: z.boolean().optional(),
        timezone: z.string().optional(),

        // Extra fält som du redan använder i frontmatter
        ingress: z.string().optional(),
        kategori: z.string().optional(),
        nivå: z.string().optional(),
        tid: z.string().optional(),
    });

const blog = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
    schema: ({ image }) => makeSchema(image, ["others"]),
});

const playbooks = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: `./${PLAYBOOKS_PATH}` }),
    schema: ({ image }) => makeSchema(image, ["playbooks"]),
});

export const collections = { blog, playbooks };
