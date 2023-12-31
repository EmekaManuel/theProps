'use client';

import {BiSearch} from "react-icons/bi"
const Search = () => {
  return (
    <div className='border-[1px] w-full py-2 rounded-full md:w-auto shadow-sm hover: hover:shadow-md transition cursor-pointer '>
        <div className='flex flex-row items-center justify-between '>
            <div className='px-6 text-sm font-semibold'> Anywhere</div>
            <div className='px-6 hidden sm:block  text-sm border-x-[1px] flex-1 text-center font-semibold'> Any Week</div>
            <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                <div className='hidden sm:block'>Add Guests</div>
                <div className='p-2 bg-rose-500 rounded-full text-white hidden sm:block'><BiSearch size={18}/></div>
            </div>

        </div>
    </div>
  )
}

export default Search