import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { ProjectSearchableFields } from './project.constant'
import { TProject, TProjects } from './project.interface'
import { Project } from './project.model'
import httpStatus from 'http-status'

// Create Project
const createProjectIntoDB = async (payload: TProjects) => {
  const newPayload = { ...payload }

  const existingProject = await Project.findOne({
    pName: newPayload?.pName,
  })

  if (existingProject) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Project name already exists!'
    )
  }

  const result = await Project.create(newPayload)

  return result
}

// Get all Project
const getAllProjectFromDB = async (query: Record<string, unknown>) => {
  // const projects = await Project.find().sort({
  //   pPinned: -1,
  //   updatedAt: -1,
  //   createdAt: -1,
  // })

  // const totalProject = projects.length
  // console.log(totalProject)

  // return projects

  const projectQuery = new QueryBuilder(Project.find(), query)
    .search(ProjectSearchableFields)
    .filter()
    // .sort()
    .sort({
      pPinned: -1,
      updatedAt: -1,
      createdAt: -1,
    })
    .paginate()
    .fields()

  const meta = await projectQuery.countTotal()
  const result = await projectQuery.modelQuery

  // return {
  //   TotalProject: totalProject,
  //   projects,
  // }

  return {
    meta,
    result,
  }
}

// get project whit category data
const getProjectsCategoryFromDB = async () => {
  const result = await Project.aggregate([
    // {
    //   $match: {
    //     pVisibility: 'Public', // optional
    //   },
    // },
    {
      $sort: {
        pPinned: -1,
        updatedAt: -1,
        createdAt: -1,
      },
    },
    {
      $group: {
        _id: '$pCategory',
        projects: { $push: '$$ROOT' },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        projects: 1,
      },
    },
  ])

  return result
}

// Get Single Project
const getSingleProjectFromDB = async (id: string) => {
  const project = await Project.findById({ _id: id })

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'This project is not found !')
  }

  const result = await Project.findById(id)

  return result
}

// Update Project
const updateProjectIntoDB = async (id: string, payload: Partial<TProjects>) => {
  if (!Object.keys(payload).length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Update payload cannot be empty')
  }

  // 🔍 pName duplicate check (exclude current project)
  if (payload.pName) {
    const existingProject = await Project.findOne({
      pName: payload.pName,
      _id: { $ne: id },
    })

    if (existingProject) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        'Project name already exists!'
      )
    }
  }

  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This project is not found!')
  }

  return result
}

// Delete Project
const deleteProjectFromDB = async (id: string) => {
  const project = await Project.findById(id)

  // Check Project Exist
  if (!project) {
    throw new Error('This project not found !')
  }

  const result = Project.findByIdAndDelete(id)
  return result
}

export const projectService = {
  createProjectIntoDB,
  getAllProjectFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
  getSingleProjectFromDB,
  getProjectsCategoryFromDB,
}
