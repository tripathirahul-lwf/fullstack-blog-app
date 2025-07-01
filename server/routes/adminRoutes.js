import express from 'express'
import { adminLogin, approvedCommentById, deleteCommentById, getAllBlogsAdmin, getAllCommentsAdmin, getDashboard } from '../controllers/adminControllers.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.get('/comments', auth, getAllCommentsAdmin);
adminRouter.post('/delete-comment', auth, deleteCommentById);
adminRouter.post('/approve-comment', auth, approvedCommentById);
adminRouter.get('/dashboard', auth, getDashboard);

export default adminRouter