
'use client';

import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center
       text-white h-[44vh]">
        <div className="font-bold text-5xl flex justify-center items-center gap-3 mb-3"> 
         Support for TOXIC from fans <span><img src="/tea.gif" width={84} alt=""/></span>
        </div>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and followers! Start now!
        </p>
        <div>
          <Link href="/login">
            <button 
              type="button" 
              className="gap-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start here
            </button>
          </Link>
          <Link href="/about">
          <button 
            type="button" 
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read more
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-15"></div>

      <div className="text-white container mx-auto py-10">
        <h1 className="text-2xl text-center mb-14 font-bold">Your fans can buy your chai</h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img src="/man.gif" width={88} alt="" className="rounded-full" />
            <p className="font-bold">Your fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img src="/coin.gif" width={88} alt="" className="rounded-full" />
            <p className="font-bold">Your fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img src="/group.gif" width={88} alt="" className="rounded-full" />
            <p className="font-bold">Your fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-15"></div>

      <div className="text-white container mx-auto py-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl text-center mb-14 font-bold">Learn more about us</h1>
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/6bg5tM2jmUU?si=MwB1jwjlc3nYd-eH" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
