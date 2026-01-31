import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { SkillsSearchableFields } from './skills.constant'
import { TSkills } from './skills.interface'
import { Skills } from './skills.model'
import httpStatus from 'http-status'

// Create Skills
const createSkillsIntoDB = async (payload: TSkills) => {
  const newPayload = { ...payload }

  const existingSkills = await Skills.findOne({
    pName: newPayload?.name,
  })

  if (existingSkills) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Skill name already exists!')
  }

  const result = await Skills.create(newPayload)

  return result
}

// Get All Skill
const getAllSkillFromDB = async (query: Record<string, unknown>) => {
  const skillsQuery = new QueryBuilder(Skills.find(), query)
    .search(SkillsSearchableFields)
    .filter()
    // .sort()
    .sort({
      pPinned: -1,
      updatedAt: -1,
      createdAt: -1,
    })
    .paginate()
    .fields()

  const meta = await skillsQuery.countTotal()
  const result = await skillsQuery.modelQuery

  return {
    meta,
    result,
  }
}

// get skills by category
const getSkillsByCategoryFromDB = async () => {
  const result = await Skills.aggregate([
    { $unwind: '$skillCategory' },

    {
      $sort: {
        pPinned: -1,
        updatedAt: -1,
        createdAt: -1,
      },
    },

    {
      $group: {
        _id: '$skillCategory',
        count: { $sum: 1 },
        skills: { $push: '$$ROOT' },
      },
    },

    {
      $project: {
        _id: 0,
        category: '$_id',
        count: 1,
        skills: 1,
      },
    },
  ])

  return result
}

// get Technical Skils
// const getTechnicalSkillFromDB = async () => {
//   const result = await Skills.find({ skillCategory: 'Technical' }).sort({
//     createdAt: -1,
//   })
//   return result
// }

// Get Single skills
const getSingleSkillsFromDB = async (id: string) => {
  const skill = await Skills.findById(id)

  // Check skill Exist
  if (!skill) {
    throw new Error('This skill not found !')
  }

  const result = await Skills.findById(id)

  return result
}

// Update skills Data
const updateSkillsIntoDB = async (id: string, payload: Partial<TSkills>) => {
  const result = await Skills.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

// Delete skills
const deleteSkillFromDB = async (id: string) => {
  const skill = await Skills.findById(id)

  // Check skills Exist
  if (!skill) {
    throw new Error('This skill not found !')
  }

  const result = Skills.findByIdAndDelete(id)
  return result
}

export const skillService = {
  createSkillsIntoDB,
  getAllSkillFromDB,
  updateSkillsIntoDB,
  deleteSkillFromDB,
  getSingleSkillsFromDB,
  // getSoftSkillFromDB,
  getSkillsByCategoryFromDB,
  // getTechnicalSkillFromDB,
}
