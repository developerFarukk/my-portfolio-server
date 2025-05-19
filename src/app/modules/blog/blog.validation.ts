

import { z } from "zod";


// Create blog validation
const createBlogValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        content: z.string({
            required_error: 'content is required',
        }),
        image: z.string().optional(),
        categoty: z.string().optional(),
    }),
});


// Update blog validation
const updateBlogValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
        categoty: z.string().optional(),
    }),
});


export const BlogValidation = {
    createBlogValidation,
    updateBlogValidation
};