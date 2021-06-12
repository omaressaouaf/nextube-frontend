import React, { useState } from "react";
import Button from "../../components/base/Button";
import Avatar from "../../components/base/Avatar";
import Layout from "../../components/layouts/Layout";
import VideoSingle from "../../components/videos/VideoSingle";
import Link from "next/link";
import Image from "next/image";

const Video = () => {
  const [videos] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 34, 6546, 4343, 55, 23, 66, 6234, 6562, 54, 23435343, 767, 24]);
  const [comments] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 34, 6546, 4343, 55, 23, 66, 6234, 6562, 54, 23435343, 767, 24]);

  return (
    <Layout>
      <div className="video-page grid grid-cols-12 gap-6 ">
        <div className="video-all col-span-12 lg:col-span-8">
          <VideoSingle />

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
                <div className="flex items-start mt-6 w-full" key={comment}>
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
              <div className="flex mb-2" key={video}>
                <Link href={`/videos/${video}`}>
                  <a className="flex mb-2">
                    <Image width={180} height={90} src="https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg" className="mb-1 hover:opacity-75 transition-opacity" alt="" />
                  </a>
                </Link>
                <div className="ml-2">
                  <Link href={`/videos/${video}`}>
                    <a className="flex mb-2">
                      <div className="mb-2 w-full text-black font-semibold">How to make an an awesome thumbnail</div>
                    </a>
                  </Link>
                  <div className="text-sm">
                    <Link href="#">
                      <a className="text-gray-600 hover:text-black">
                        TheRussianGenuis <i className="fa fa-check-circle transition text-blue-500"></i>
                      </a>
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600">245k views &middot; 3 days ago</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Video;
