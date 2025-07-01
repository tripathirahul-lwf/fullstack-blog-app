import { useNavigate } from 'react-router-dom'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img onClick={() => useNavigate('/')} src={assets.logo} alt="site logo" className='w-32 sm:w-44 cursor-pointer' />
          <p className='text-sm md:text-base mt-4 max-w-[410px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat assumenda, veritatis quos velit accusantium reprehenderit id ipsam atque aspernatur libero placeat voluptatibus aliquam vero, et facere quia quisquam. Hic, corrupti.</p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          {
            footer_data.map((section, index) => (
              <div key={index}>
                <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                <ul className='text-sm space-y-1'>
                  {
                    section.links.map((link, linkIndex) => (
                      <li key={linkIndex}><a href={`#${link}`} className='text-gray-500 hover:text-blue-500 hover:underline'>{link}</a></li>
                    ))
                  }
                </ul>
              </div>
            ))
          }

        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 &copy; QuickBlog GreatStack - All</p>
    </footer>
  )
}

export default Footer
