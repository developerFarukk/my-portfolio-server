

import { Router } from "express";
import { StartRoutes } from "../modules/start/start.route";
import { ProjectRoutes } from "../modules/projects/project.route";

const router = Router();

const moduleRoutes = [

    {
        path: '/start',
        route: StartRoutes,
    },
    {
        path: '/projects',
        route: ProjectRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;