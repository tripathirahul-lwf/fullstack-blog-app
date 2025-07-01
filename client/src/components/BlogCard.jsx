import { useNavigate } from "react-router-dom";


const BlogCard = ({ blog }) => {
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/blog/${_id}`)}
            className="w-full rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1.5 hover cursor-pointer"
        >
            <img src={image} alt="blog image" className='aspect-video' />
            <span className='rounded-full px-4 py-2.5 ml-5 mt-4  inline-block bg-primary/20 text-primary text-xs'>
                {category}
            </span>
            <div className="p-5">
                <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
                <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{__html: description.slice(0, 80)}}></p>
            </div>
        </div>
    )
}

export default BlogCard
