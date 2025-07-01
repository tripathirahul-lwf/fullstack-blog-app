import { useState } from 'react'
import { motion } from "motion/react"
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const Bloglist = () => {
    const [blogCategoryActive, setBlogCategoryActive] = useState("All");

    const { blogs, input } = useAppContext();

    const filteredData = () => {
        if (input === '') {
            return blogs;
        }
        return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

    return (
        <div>
            <div className="flex item-center justify-center gap-4 sm:gap-8 my-10 relative">
                {
                    blogCategories.map((cat) => {
                        return (
                            <button
                                key={cat}
                                onClick={() => setBlogCategoryActive(cat)}
                                className={`flex relative items-center gap-2 px-4 py-2.5 cursor-pointer text-sm font-medium
                                ${blogCategoryActive === cat && 'text-white'}`}>
                                {cat}
                                {
                                    blogCategoryActive === cat &&
                                    <motion.div
                                        layoutId="underline-underline"
                                        transition={{ typeof: 'spring', damping: 30, stiffness: 200 }}
                                        className="absolute top-0 left-0  rounded-full w-full h-full bg-primary -z-1"></motion.div>
                                }
                            </button>
                        )
                    })
                }
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {
                    filteredData().filter(
                        (blog) => blogCategoryActive === "All" ?
                            true :
                            blog.category === blogCategoryActive).map((blog) =>
                                <BlogCard key={blog._id} blog={blog} />
                            )
                }
            </div>
        </div>
    )
}

export default Bloglist
