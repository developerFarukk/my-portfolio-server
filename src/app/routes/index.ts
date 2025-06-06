

import { Router } from "express";
import { ProjectRoutes } from "../modules/projects/project.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogsRoutes } from "../modules/blog/blog.route";
import { SkillsRoutes } from "../modules/skills/skills.route";
import { DashboardRoutes } from "../modules/dashboard/dashboard.route";

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
    {
        path: '/blogs',
        route: BlogsRoutes,
    },
    {
        path: '/skills',
        route: SkillsRoutes,
    },
    {
        path: '/dashboard',
        route: DashboardRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;