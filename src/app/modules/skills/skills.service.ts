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
export const getSkillsByCategoryFromDB = async () => {
  // Fetch category-wise aggregation
  const categoryWisePromise = Skills.aggregate([
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

  // Fetch all skills without grouping
  const allSkillsPromise = Skills.find()
    .sort({ pPinned: -1, updatedAt: -1, createdAt: -1 })
    .lean()

  // Run both queries in parallel
  const [categoryWise, allSkills] = await Promise.all([
    categoryWisePromise,
    allSkillsPromise,
  ])

  return {
    categoryWise,
    allSkills: {
      total: allSkills.length,
      skills: allSkills,
    },
  }
}

// Get Single skills
const getSingleSkillsFromDB = async (id: string) => {
  const skill = await Skills.findById({ _id: id })

  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, 'This skill is not found !')
  }

  const result = await Skills.findById(id)

  return result
}

// Update skills Data
const updateSkillsIntoDB = async (id: string, payload: Partial<TSkills>) => {
  if (!Object.keys(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Update payload cannot be empty')
  }

  if (payload.name) {
    const existingProject = await Skills.findOne({
      pName: payload.name,
      _id: { $ne: id },
    })

    if (existingProject) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        'Skill name already exists!'
      )
    }
  }

  const result = await Skills.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This skill is not found!')
  }

  return result
}

// Delete skills
const deleteSkillFromDB = async (id: string) => {
  const result = await Skills.findByIdAndDelete(id)

  // Check skills Exist
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This skill is not found!')
  }
  return result
}

export const skillService = {
  createSkillsIntoDB,
  getAllSkillFromDB,
  updateSkillsIntoDB,
  deleteSkillFromDB,
  getSingleSkillsFromDB,
  getSkillsByCategoryFromDB,
}
