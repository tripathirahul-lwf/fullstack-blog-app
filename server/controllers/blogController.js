import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        const imageFile = req.file;


        if (!title || !description || !imageFile || !isPublished) {
            return res.json({ success: false, message: "Some Required Fields are missing" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path)


        // upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        //optimize through imagekit URL transformation

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },  // auto compression
                { format: 'webp' }, // convert to modern format
                { width: '1280' } // width resizing
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({ title, subTitle, description, category, image, isPublished })

        res.json({ success: true, message: "Blog added successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message, result: "Blog controller error" });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message, result: "Blog fetch error" });
    }
}

export const getBlogByID = async (req, res) => {
    try {
        const { blogID } = req.params;
        const blog = await Blog.findById(blogID);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found!" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message, result: "Blog finding error" });
    }
}

export const deleteBlogByID = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id)

        // delete comments associate with the blog
        await Comment.deleteMany({blog: id})


        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message, result: "Blog Deleted error" });
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ success: false, message: "Blog id not found!" });
        }
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found!" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save()
        res.json({ success: true, message: "Blog status updated", isPublished: blog.isPublished });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        if (!blog && !name && !content) {
            return res.json({ success: false, message: "Some required fields are missing" });
        }
        await Comment.create({ blog, name, content })
        res.json({ success: true, message: "Comment added for review" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogID } = req.body;
        const comments = await Comment.find({blog: blogID, isApproved: true}).sort({createdAt: -1})
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}