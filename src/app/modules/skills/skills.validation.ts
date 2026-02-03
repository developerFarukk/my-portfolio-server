import { z } from 'zod'
// import { SkillCategory } from './skills.interface'

// const skillCategorySchema = z.union([
//   z.nativeEnum(SkillCategory),
//   z.literal(''),
// ])

const skillCategoryEnum = z.enum([
  'Technical',
  'Soft',
  'Front-end',
  'Backend',
  'UI-Tools',
])

const skillCategorySchema = z
  .array(skillCategoryEnum)
  .min(1, 'At least one skill category is required')


const updateSkillCategorySchema = z
  .array(skillCategoryEnum)
  .optional()

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

    title: z.string().max(500, 'Description is too long').optional(),

    description: z.string().max(1000, 'Description is too long').optional(),

    image: z
      .string()
      .url('Please enter a valid URL')
      .optional()
      .or(z.literal('')),

    skillCategory: skillCategorySchema,
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

    skillCategory: updateSkillCategorySchema,
  }),
})

export const SkillsValidation = {
  createSkillValidation,
  updateSkillValidation,
}
