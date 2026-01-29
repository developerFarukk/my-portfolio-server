import { z } from 'zod'
import { SkillCategory } from './skills.interface'

const skillCategorySchema = z.union([
  z.nativeEnum(SkillCategory),
  z.literal(''),
])

// Create Skill validation
// const createSkillValidation = z.object({
//     body: z.object({
//         title: z.string({
//             required_error: 'Title is required',
//         }),
//         description: z.string().optional(),
//         image: z.string().optional(),
//         skillCategory: z.enum(['Technical', 'Soft', 'Front-end' , 'Backend' , 'UI-Tools'])
//     }),
// });
const createSkillValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Skill name is required',
    }),

    title: z.string().optional(),

    description: z.string().optional(),

    image: z.string().url().optional(),

    skillCategory: skillCategorySchema.optional(),
  }),
})

// Update blog validation
// const updateSkillValidation = z.object({
//   body: z.object({
//     title: z.string().optional(),
//     description: z.string().optional(),
//     image: z.string().optional(),
//     skillCategory: z
//       .enum(['Technical', 'Soft', 'Front-end', 'Backend', 'UI-Tools'])
//       .optional(),
//   }),
// })

const updateSkillValidation = z.object({
  body: z.object({
    name: z.string().optional(),

    title: z.string().optional(),

    description: z.string().optional(),

    image: z.string().optional(),

    skillCategory: skillCategorySchema.optional(),
  }),
})

export const SkillsValidation = {
  createSkillValidation,
  updateSkillValidation,
}
