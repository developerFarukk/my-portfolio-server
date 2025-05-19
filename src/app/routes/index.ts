

import { Router } from "express";
import { ProjectRoutes } from "../modules/projects/project.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/projects',
        route: ProjectRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;