import Link from "next/link";
import Image from "next/image";
import Avatar from "../base/Avatar";
import PropTypes from "prop-types";
import { formatDateAgo, formatVideoDuration } from "../../global/helpers";

const VideoItem = ({ video }) => {
  return (
    <div className="video-preview mb-5" key={video.id}>
      <Link href={`/videos/${video.id}`}>
        <a className="relative">
          <Image
            placeholder="blur"
            blurDataURL={video.thumbnail}
            width={500}
            height={300}
            src={video.thumbnail}
            className="mb-1 hover:opacity-75 transition-opacity"
            alt="thumbnail"
          />

          <div className="absolute bottom-2 right-1 p-1 text-xs font-semibold bg-lightBlack text-gray-200 rounded-sm">
            {formatVideoDuration(video.duration)}
          </div>
        </a>
      </Link>
      <div className="flex items-start mt-4">
        <Avatar className="w-7 mr-3 mt-1" src={video.user.avatar} />

        <div>
          <div className="mb-2 w-48 2xl:w-64">
            <Link href={`/videos/${video.id}`}>
              <a className="text-black dark:text-white break-words font-semibold w-full">
                {video.title}
              </a>
            </Link>
          </div>
          <div className="text-sm">
            <Link href={`/channels/${video.user.channelName}`}>
              <a className="text-gray-600 capitalize hover:text-black dark:text-gray-400 dark:hover:text-white ">
                {video.user.channelName}
                <i className="fa fa-check-circle ml-2"></i>
              </a>
            </Link>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {video.viewsCount} views &middot; {formatDateAgo(video.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

VideoItem.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoItem;
