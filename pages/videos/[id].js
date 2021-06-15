import React, { useState } from "react";
import Button from "../../components/base/Button";
import Avatar from "../../components/base/Avatar";
import Layout from "../../components/layouts/Layout";
import VideoSingle from "../../components/videos/VideoSingle";
import SuggestionList from "../../components/videos/SuggestionList";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Video = () => {
  const [comments] = useState([]);

  // redux
  const [video, loading] = useSelector(state => [state.videosReducer.video, state.uiReducer.loadings.VideoSingle]);

  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title={loading ? '' : video.title}>
      <div className="video-page grid grid-cols-12 gap-6 ">
        <div className="video-all col-span-12 lg:col-span-8">
          {router.isReady && <VideoSingle videoId={id} />}

          <hr className="my-5 dark:border-darkGray" />

          <div className="comments-section w-full">
            <p className="text-gray-800 dark:text-gray-200">10 Comments</p>
            <div className="flex items-start mt-6 w-full">
              <Avatar className="w-10 mr-3 mt-1" />
              <form className="flex-grow ">
                <textarea className="transition w-full bg-transparent resize-none	border-b dark:border-darkGray focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 placeholder-opacity-5" placeholder="Add a public comment" rows="2"></textarea>
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
                      John does <span className="text-gray-600 dark:text-gray-400 text-xs">3 hours ago</span>
                    </p>
                    <p>I got request for you. Could you show us extension for vs code that would improve our coding experience. Thank you.uest for you. Could you show us extension for vs code that would improve our coding experience. Thank you.</p>
                    <div className="flex items-center mt-3 gap-4 text-xs">
                      <button className="text-gray-600 dark:text-gray-400 font-semibold focus:outline-none uppercase">
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
        <div className="suggestions col-span-12 lg:col-span-4">{router.isReady && <SuggestionList videoId={id} />}</div>
      </div>
    </Layout>
  );
};

export default Video;
