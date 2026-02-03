


import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { SkillsValidation } from './skills.validation';
import { SkillsControllers } from './skills.controler';

const router = express.Router();

// Creat skill Data Route
router.post(
    '/create-skill',
    auth(USER_ROLE.admin),
    validateRequest(SkillsValidation.createSkillValidation),
    SkillsControllers.createSkill,
);

// All Data get of skill Route
router.get('/', SkillsControllers.getAllSkills);


// Soft skills data route
router.get('/categoryskill', SkillsControllers.getSkillsByCategory);


// Technical skills data route
// router.get('/technical', SkillsControllers.getTechnicalSkills);


// Single skill data get Route
router.get("/:id", SkillsControllers.getSingleSkill)


// Update skill Route
router.patch(
    '/update/:id',
    auth(USER_ROLE.admin),
    validateRequest(SkillsValidation.updateSkillValidation),
    SkillsControllers.updateSkill,
);

// Delete skill Route
router.delete(
    '/delete/:id',
    auth(USER_ROLE.admin),
    SkillsControllers.deleteSkill,
);

export const SkillsRoutes = router;