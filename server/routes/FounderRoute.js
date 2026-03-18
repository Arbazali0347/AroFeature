import express from 'express';
import { AddFounderData, getMe, login, register } from '../Controllers/AuthController.js';

const FounderRoute = express.Router();

FounderRoute.post("/register", register)
FounderRoute.post("/login", login)
FounderRoute.post("/add-founder-data", AddFounderData)

// Yeh naya route add karein:
FounderRoute.get("/me", getMe);

export default FounderRoute;