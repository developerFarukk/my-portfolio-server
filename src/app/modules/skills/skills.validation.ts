
import { z } from "zod";


// Create Skill validation
const createSkillValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        description: z.string().optional(),
        image: z.string().optional(),
        skillCategory: z.enum(['Technical', 'Soft', 'Front-end' , 'Backend' , 'UI-Tools'])
    }),
});


// Update blog validation
const updateSkillValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        skillCategory: z.enum(['Technical', 'Soft', 'Front-end' , 'Backend' , 'UI-Tools']).optional()
    }),
});


export const SkillsValidation = {
    createSkillValidation,
    updateSkillValidation
};