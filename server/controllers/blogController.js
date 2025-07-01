import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import main from '../config/gemini.js';

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
        const { id } = req.body;
        await Blog.findByIdAndDelete(id)

        // delete comments associate with the blog
        await Comment.deleteMany({ blog: id })
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
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: "Comment added for review" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogID } = req.body;
        const comments = await Comment.find({ blog: blogID, isApproved: true }).sort({ createdAt: -1 })
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        // const content = await main(prompt + " Generate a blog content for this topic in simple text format");
        const content = await main("Write a blog about importance of clean energy in simple text");
        console.log("🔍 Sending prompt to Gemini:", content);

        // ✅ check again in case main() fails silently
        if (!content || typeof content !== "string" || content.trim().length === 0) {
            return res.status(500).json({ success: false, message: "Failed to generate content." });
        }

        res.json({ success: true, content });
    } catch (error) {
        console.error("Error in generateContent:", error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
};