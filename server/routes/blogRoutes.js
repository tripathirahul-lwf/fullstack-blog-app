import express from 'express'
import { addBlog, addComment, deleteBlogByID, generateContent, getAllBlogs, getBlogByID, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router()

blogRouter.post('/add', upload.single('image'), auth, addBlog)
blogRouter.get('/all', getAllBlogs);
blogRouter.post('/comments',auth, getBlogComments);
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.get('/:blogID',auth, getBlogByID);
blogRouter.post('/:id', auth, deleteBlogByID);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/generate', auth, generateContent);

export default blogRouter