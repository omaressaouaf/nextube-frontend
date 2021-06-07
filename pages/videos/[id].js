import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/base/Button";
import Avatar from "../../components/base/Avatar";
import Layout from "../../components/layouts/Layout";

export default function Video() {
  const [videos] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 34, 6546, 23, 55, 23, 66, 6234, 6562, 54, 23, 767, 24]);
  const [comments] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 34, 6546, 23, 55, 23, 66, 6234, 6562, 54, 23, 767, 24]);

  return (
    <Layout>
      <div className="video-page grid grid-cols-12 gap-6">
        <div className="video-all col-span-12 lg:col-span-8">
          <div className="video-details">
            <video className="w-full mb-5" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            </video>
            <h2 className="mb-3 font-semibold">3 A.M Study Session 📚 - [lofi hip hop/chill beats]</h2>
            <div className="mb-5 lg:mb-0 text-sm text-gray-600">245k views &middot; 3 days ago</div>
            <div className="flex items-center justify-end gap-4">
              <button className="text-blue-500 focus:outline-none  text-sm">
                <i className="fa fa-thumbs-up fa-lg"></i> 123K
              </button>
              <button className="text-gray-500 focus:outline-none  text-sm">
                <i className="fa fa-thumbs-down fa-lg"></i> 123K
              </button>
              <button className="text-gray-500 focus:outline-none uppercase text-sm">
                <i className="fa fa-share fa-lg"></i> Share
              </button>
              <button className="text-gray-500 focus:outline-none uppercase text-sm">
                <i className="fa fa-clock fa-lg"></i> Later
              </button>
            </div>
          </div>
          <hr className="my-5" />

          <div className="video-description flex items-start flex-wrap md:flex-nowrap  justify-between">
            <div className="flex items-start order-2 md:order-1">
              <Avatar className=" w-12 mr-3 mt-1" />
              <div className="text-sm mt-1">
                <a href="#" className="font-semibold text-sm">
                  Academind
                  <i className="fa fa-check-circle text-blue-500 ml-2"></i>
                </a>
                <p className="text-xs font-medium text-gray-600">8.49M subscribers</p>
                <div className="mt-5">
                  <p className="mb-4">
                    Get Started with React.js and learn how to build amazing websites with ReactJS! Full Project included, 100% free! Join our bestselling ReactJS course: https://acad.link/reactjs Join our Academind Community on Discord: https://academind.com/community Check out all our other
                    courses: https://academind.com/courses ...
                  </p>

                  <a href="#" className="uppercase text-xs text-gray-700 font-semibold">
                    Show more
                  </a>
                </div>
              </div>
            </div>
            <div className="ml-auto order-1 md:order-2">
              <Button className="btn-red mb-2">Subscribe</Button>
            </div>
          </div>
          <hr className="my-5" />

          <div className="comments-section w-full">
            <p className="text-gray-800">10 Comments</p>
            <div className="flex items-start mt-6 w-full">
              <Avatar className="w-10 mr-3 mt-1" />
              <form className="flex-grow ">
                <textarea className="transition w-full bg-transparent resize-none	border-b focus:outline-none focus:border-blue-400   placeholder-opacity-5" placeholder="Add a public comment" rows="2"></textarea>
              </form>
            </div>
            <div className="flex items-start my-2">
              <Button disabled className="btn-blue mb-2 ml-auto ">
                Comment
              </Button>
            </div>
            {comments.map(comment => {
              return (
                <div className="flex items-start mt-6 w-full">
                  <Avatar className="w-10 mr-3 mt-1" />
                  <div className="flex-grow text-sm">
                    <p className="font-semibold mb-1">
                      John does <span className="text-gray-600 text-xs">3 hours ago</span>
                    </p>
                    <p>I got request for you. Could you show us extension for vs code that would improve our coding experience. Thank you.uest for you. Could you show us extension for vs code that would improve our coding experience. Thank you.</p>
                    <div className="flex items-center mt-3 gap-4 text-xs">
                      <button className="text-gray-600 font-semibold focus:outline-none uppercase">
                        <i className="fa fa-reply"></i>
                      </button>
                      <button className="text-blue-500 font-semibold focus:outline-none uppercase ">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="text-red-500 font-semibold focus:outline-none uppercase">
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="recommendations col-span-12 lg:col-span-4">
          {videos.map(video => {
            return (
              <Link href={`/videos/${video}`}>
                <a className="flex  mb-2">
                  <Image width={180} height={90} src="https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg" className="mb-1 hover:opacity-75 transition-opacity" alt="" />
                  <div className="ml-2">
                    <div className="mb-2 w-full text-black font-semibold">How to make an an awesome thumbnail</div>
                    <div className="text-sm">
                      <a href="/wewe" className="text-gray-600 hover:text-black">
                        TheRussianGenuis <i className="fa fa-check-circle transition text-blue-500"></i>
                      </a>
                    </div>
                    <div className="text-sm text-gray-600">245k views &middot; 3 days ago</div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
