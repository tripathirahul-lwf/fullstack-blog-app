import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked'

const AddBlog = () => {

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const { axios } = useAppContext();
  const [isAdding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCatagory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setAdding(true)
      const blog = {
        title, subTitle, category, isPublished,
        description: quillRef.current.root.innerHTML
      }
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);
      const { data } = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success(data.message)
        setTitle('')
        setImage(false)
        setSubTitle('')
        setCatagory('Startup')
        setIsPublished(false)
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setAdding(false)
    }
  }



  const generateContent = async () => {
    if (!title) return toast.error('Please enter a title');

    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });

      if (data.success) {
        if (!data.content) {
          return toast.error("Generated content is empty.");
        }
        quillRef.current.root.innerHTML = parse(data.content); // ✅ safe now
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-[90vh] overflow-y-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer' alt="" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input
          type="text"
          placeholder='Type Here'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={(e) => setTitle(e.target.value)} value={title}
        />
        <p className='mt-4'>Sub Title</p>
        <input
          type="text"
          placeholder='Type Here'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={(e) => setSubTitle(e.target.value)} value={subTitle}
        />

        <p className="mt-4">Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          {
            loading && (
              <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
                <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>

              </div>
            )
          }
          <button type="button" disabled={loading} onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate With AI</button>
        </div>

        <p className="mt-4">Blog Catagory</p>
        <select onChange={(e) => setCatagory(e.target.value)} name="catagory" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="" hidden>Select Catagory</option>
          {blogCategories.map((catagory, index) => <option key={index} value={catagory}>{catagory}</option>)}
        </select>
        <div className='flex gap-2 mt-2'>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)} />
        </div>
        <button
          disabled={isAdding}
          type="submit"
          className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
          {isAdding ? 'Adding...' : "Add Blog"}
        </button>
      </div>
    </form>
  )
}

export default AddBlog
