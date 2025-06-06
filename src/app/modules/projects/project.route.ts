


import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './project.validation';
import { ProjectControllers } from './project.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();


// Creat Project Data Route
router.post(
    '/create-project',
    auth(USER_ROLE.admin),
    validateRequest(ProjectValidation.createProjectValidation),
    ProjectControllers.createProject
);


// All Data get of Project Route
router.get('/', ProjectControllers.getAllProject);


// Single Project data get Route
router.get("/:id", ProjectControllers.getSingleProject)



// Update Project Route
router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequest(ProjectValidation.updateProjectValidation),
    ProjectControllers.updateProject,
);


// Delete Project Route
router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    ProjectControllers.deleteProject,
);




export const ProjectRoutes = router;