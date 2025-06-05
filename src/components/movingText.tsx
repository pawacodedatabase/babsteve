import React from 'react';

const MovingText: React.FC = () => {
  return (
    <div className="overflow-hidden w-full bg-[#000] p-2">
      <div className="whitespace-nowrap animate-marquee text-sm  text-center text-[#ffffff]">
       Follow us <span className='text-[#01aefb] font-semibold'> on Facebook </span>- <span className='text-[#01aefb] font-semibold'>Babasteve Merchandise Enterprises</span>
      </div>
    </div>
  );
};

export default MovingText;
