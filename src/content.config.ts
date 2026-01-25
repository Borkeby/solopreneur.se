import { defineCollection, z } from "astro:content";
import type { ImageFunction } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PLAYBOOKS_PATH = "src/data/playbooks";
export const DOWNLOADS_PATH = "src/data/downloads";

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

        // Extra fält
        ingress: z.string().optional(),
        kategori: z.string().optional(),
        nivå: z.string().optional(),
        tid: z.string().optional(),
        kostnad: z.string().optional(),
        slug: z.string().optional(),
    });

// Downloads: datum ska inte vara krav, men resten vill vi kunna återanvända.
// Vi utgår från samma fält som makeSchema, men gör pubDatetime optional och lägger till file/file2.
const makeDownloadsSchema = (image: ImageFunction, defaultTags: string[]) =>
    makeSchema(image, defaultTags)
        .extend({
            pubDatetime: z.date().optional(),
            description: z.string().optional(), // tillåt kortare poster utan description
            file: z.object({
                href: z.string(), // ex "/downloads/korjournal/korjournal.xlsx"
                label: z.string().optional(),
                type: z.string().optional(),
            }),
            file2: z
                .object({
                    href: z.string(),
                    label: z.string().optional(),
                    type: z.string().optional(),
                })
                .optional(),
        });

const blog = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
    schema: ({ image }) => makeSchema(image, ["others"]),
});

const playbooks = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: `./${PLAYBOOKS_PATH}` }),
    schema: ({ image }) => makeSchema(image, ["playbooks"]),
});

const downloads = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: `./${DOWNLOADS_PATH}` }),
    schema: ({ image }) => makeDownloadsSchema(image, ["downloads"]),
});

export const collections = { blog, playbooks, downloads };
