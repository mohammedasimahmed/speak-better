import Image from "next/image";
import React from "react";
import aboutdata from "@/content/about.json";

const page = () => {
  const {aboutTitle, aboutDescription, madeByTitle, creatorName, creatorImage} = aboutdata;
  return (
    <div className='w-screen min-h-screen p-2 sm:p-6'>
      <div className='text-white flex flex-col justify-center items-center gap-6'>
        <div className='text-5xl md:text-6xl text-center mt-20'>{aboutTitle}</div>
        <div className='text-lg md:text-xl text-center font-extralight w-full md:w-150'>
          {aboutDescription}
        </div>
      </div>
      <div className='text-white flex flex-col justify-center items-center gap-4 mt-30'>
        <div className='text-6xl'>{madeByTitle}</div>
        <div className='w-80 h-80 md:w-100 md:h-100 rounded-full overflow-hidden relative'>
          <Image src={creatorImage} alt='Asim' fill className='object-cover' />
        </div>
        <div className='text-lg md:text-xl'>{creatorName}</div>
      </div>
    </div>
  );
};

export default page;
