
import express from 'express';
import { DashboardControllers } from './dashboard.controler';

const router = express.Router();


// All Data get of Blog Route
router.get('/', DashboardControllers.getAllDashboardData);


export const DashboardRoutes = router;