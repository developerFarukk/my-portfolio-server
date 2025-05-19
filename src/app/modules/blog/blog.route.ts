

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogsControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Creat Blogs Data Route
router.post(
    '/create-blog',
    auth(USER_ROLE.admin),
    validateRequest(BlogValidation.createBlogValidation),
    BlogsControllers.createblogs,
);

// All Data get of Blog Route
router.get('/', BlogsControllers.getAllBlog);


// Single Blog data get Route
router.get("/:id", BlogsControllers.getSingleBlog)


// Update Blog Route
router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequest(BlogValidation.updateBlogValidation),
    BlogsControllers.updateBlog,
);

// Delete Blog Route
router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    BlogsControllers.deleteBlog,
);

export const BlogsRoutes = router;