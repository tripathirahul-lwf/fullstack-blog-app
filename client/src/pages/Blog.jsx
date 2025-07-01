import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import Moment from 'moment'
import './Blog.css'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const Blog = () => {

  const { id } = useParams() // Import the useParams hook from react-router-dom
  const [data, setData] = useState(null) // State variable to hold the blog data
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]) // State variable to hold the blog comments
  const [name, setName] = useState('') // State variable to hold the Name of the commenter
  const [content, setContent] = useState('') // State variable to hold the Comment of the commenter

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
    }
  }
  const fetchCommentsData = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogID: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const addComment  = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if (data.success) {
        toast.success(data.message)
        setName('');
        setContent('');
      }
      else{
         toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchBlogData()
    fetchCommentsData()
  }, [])
  console.log(comments)
  console.log(name)
  console.log(content)
  return data ? (
    <div className='relative'>
      <img
        src={assets.gradientBackground}
        alt="gradient-background"
        className='absolute -top-50 -z-1 opacity-50'
      />
      <Navbar />
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published On: {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michael Brown</p>
      </div>
      <div className='max-w-5xl mx-auto'>
        <div>
          <img src={data.image} alt="blog-image" className='w-full rounded-md' />
        </div>
        <div className='mt-10 max-w-3xl mx-auto'>
          <div className='text-sm text-gray-700 rich-text' dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
        {/* coments data */}
        <div className='mt-16 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {
              comments.map((item, index) => {
                return (
                  <div key={index}>
                    <div className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                      <div className="flex items-center gap-2 mb-2">
                        <img src={assets.user_icon} alt="comment-icon" className='w-6' />
                        <p className='font-medium'>{item.name}</p>
                      </div>
                      <p className='text-sm max-w-md ml-8 text-gray-700'>{item.content}</p>
                      <p className='absolute right-4 bottom-3 text-xs'>{Moment(item.createdAt).fromNow()}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* add comments form */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className='font-semibold mb-4'>Leave a Comment</h2>
          <form onSubmit={addComment}>
            <div className='flex gap-4'>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' className='border-2 border-gray-300 h-12 ps-4 rounded-md w-full' />
            </div>
            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Comment' className='border-2 border-gray-300 rounded-md ps-4 pt-3 w-full mt-4' rows='4' />
            <button type='submit' className='py-2 px-4 mt-4 cursor-pointer rounded-md text-white bg-primary'>Submit</button>
          </form>
        </div>
        {/* Share Buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media</p>
          <div className="flex">
            <img src={assets.facebook_icon} alt="facebook icon" className='w-12 cursor-pointer' />
            <img src={assets.twitter_icon} alt="twitter icon" className='w-12 cursor-pointer' />
            <img src={assets.googleplus_icon} alt="google plus icon" className='w-12 cursor-pointer' />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : <Loader />;
}

export default Blog