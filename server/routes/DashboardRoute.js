import express from 'express';
import { deleteFeature, getDashboardStats, updateFeatureStatus } from '../Controllers/DashboardController.js';

const DashboardRoute = express.Router();

// Dashboard APIs
DashboardRoute.get("/stats", getDashboardStats);
DashboardRoute.put("/feature/status/:id", updateFeatureStatus);
DashboardRoute.delete("/feature/:id", deleteFeature);

export default DashboardRoute;