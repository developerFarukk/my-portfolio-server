import { model, Schema } from 'mongoose'
import { SkillCategory, TSkills } from './skills.interface'

const skillSchema = new Schema<TSkills>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    title: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    skillCategory: {
      type: String,
      //   enum: Object.values(SkillCategory),
      enum: [...Object.values(SkillCategory), ''],
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Skills = model<TSkills>('Skills', skillSchema)
