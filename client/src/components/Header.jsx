import { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';



const Header = () => {

  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  }

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border rounded-full border-primary/40 bg-primary/10 text-primary text-sm font-semibold'>
          <p>New AI feature Integrated</p>
          <img src={assets.star_icon} alt="star icon" className='w-2.5' />
        </div>
        <h1 className='text-4xl md:text-6xl font-semibold sm:leading-16 text-gray-700'>Your own <span className="text-primary">blogging</span> <br /> plateform</h1>
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic cumque impedit reiciendis. Nobis quia similique deserunt corrupti porro labore placeat asperiores, possimus fugit.</p>

        <form
          onSubmit={onSubmitHandler}
          className='flex justify-center max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'
        >
          <input
            className='w-full pl-4 outline-0'
            type="text"
            ref={inputRef}
            placeholder='Search for blogs'
            required />
          <button
            type='submit'
            className='bg-primary text-white text-sm font-semibold px-4 py-2 m-1.5 cursor-pointer rounded hover:scale-105 transition-transform duration-300'
          >
            Search
          </button>
        </form>
      </div>

      <div className='text-center mt-5'>
        {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
      </div>
      <img src={assets.gradientBackground} alt="gradient background" className='absolute -top-50 -z-1' />
    </div>
  )
}

export default Header
