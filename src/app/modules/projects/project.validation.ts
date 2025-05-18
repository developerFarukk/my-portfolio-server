
import { z } from "zod";



// Create Project validation
const createProjectValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        descriptions: z.string({
            required_error: 'Description is required',
        }),
        liveLink: z.string({
            required_error: 'LiveLink is required',
        }),
        image: z.string().optional(),
        githubClient: z.string().optional(),
        githubServer: z.string().optional(),
    }),
});



// Create Project validation
const updateProjectValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        descriptions: z.string().optional(),
        liveLink: z.string().optional(),
        image: z.string().optional(),
        githubClient: z.string().optional(),
        githubServer: z.string().optional(),
    }),
});


export const ProjectValidation = {
    createProjectValidation,
    updateProjectValidation
};