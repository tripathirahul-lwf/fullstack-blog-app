import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    const { navigate, token } = useAppContext()

    return (
        <nav className='flex justify-between items-center py-5 px-10 mx-8 sm:mx-20 xl:mx-32'>
            <Link to="/"><img src={assets.logo} alt="Blog logo" aria-label='Blog site logo' className='w-32 sm:w-44' loading='lazy' /></Link>
            <button onClick={() => navigate('/admin')} className='bg-primary flex items-center gap-1.5 hover:bg-blue-700  cursor-pointer text-white px-10 py-2.5 rounded-full transition-colors duration-300'>
                {token ? 'Dashboard' : 'Login'}
                <img src={assets.arrow} alt="arrow" aria-hidden="true" className='w-4' />
            </button>
        </nav>
    )
}

export default Navbar
