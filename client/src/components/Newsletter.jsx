import React from 'react'

const Newsletter = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
            <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a blog!</h1>
            <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blog and exclusive news on your mail.</p>
            <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
                <input
                    className='border-2 border-gray-300 rounded-md h-full border-r-0 focus:outline-none outline-none w-full rounded-r-none ps-4'
                    type="text"
                    placeholder='Enter you email id'
                    required
                />
                <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'>Subscribe</button>

            </form>
        </div>
    )
}

export default Newsletter
