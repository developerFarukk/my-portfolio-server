import AppError from '../../errors/AppError'
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
const getAllProjectFromDB = async () => {
  const blog = Project.find().sort({ createdAt: -1 })

  return blog
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
const updateProjectIntoDB = async (id: string, payload: Partial<TProject>) => {
  const project = await Project.findById({ _id: id })

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'This project is not found !')
  }

  const result = await Project.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

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
}
