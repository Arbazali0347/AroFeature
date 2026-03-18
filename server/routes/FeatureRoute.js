import express from 'express';
import { addComment, createFeature, getAllFeatures, toggleVote } from '../Controllers/FeatureController.js';

const FeatureRoute = express.Router();

FeatureRoute.get("/", getAllFeatures);
FeatureRoute.post("/add", createFeature);
FeatureRoute.put("/vote/:id", toggleVote);
FeatureRoute.post("/comment/:id", addComment);

export default FeatureRoute;