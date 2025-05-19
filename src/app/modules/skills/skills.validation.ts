
import { z } from "zod";


// Create Skill validation
const createSkillValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        description: z.string().optional(),
        image: z.string().optional(),
        skillCategory: z.enum(['Technical', 'Soft'])
    }),
});


// Update blog validation
const updateSkillValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        skillCategory: z.enum(['Technical', 'Soft']).optional()
    }),
});


export const BlogValidation = {
    createSkillValidation,
    updateSkillValidation
};