import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { formatDateAgo, truncateString } from "../../global/helpers";

const VideoItemWide = ({ video, idField, subscription }) => {
  return (
    <div className="flex mb-2 flex-wrap md:flex-nowrap">
      <Link href={`/videos/${video[idField]}`}>
        <a className="flex mb-2 relative">
          <Image
            placeholder="blur"
            blurDataURL={video.thumbnail}
            width={280}
            height={150}
            layout="fixed"
            src={video.thumbnail}
            className="mb-1 hover:opacity-75 transition-opacity"
            alt="thumbnail"
          />
          {video.duration && (
            <div className="absolute bottom-2 right-1 p-1 text-xs font-semibold bg-lightBlack text-gray-200 rounded-sm">
              {video.duration.toFixed(2).replace(".", ":")}
            </div>
          )}
        </a>
      </Link>
      <div className="ml-2">
        <Link href={`/videos/${video[idField]}`}>
          <a className="flex mb-0">
            <div className=" w-full text-black dark:text-gray-200 font-semibold">{video.title}</div>
          </a>
        </Link>
        <div className="text-sm">
          <Link href="#">
            <a className="text-gray-600 capitalize hover:text-black dark:text-gray-400 dark:hover:gray-200">
              {subscription ? subscription.user.channelName : video.user.channelName}
              <i className="fa fa-check-circle transition text-blue-500 ml-2 mr-1"></i>
              &middot; {video.viewsCount} views &middot; {formatDateAgo(video.createdAt)}
            </a>
          </Link>
        </div>
        <div className="text-sm dark:text-gray-400 mt-3">{truncateString(video.description)}</div>
      </div>
    </div>
  );
};

VideoItemWide.propTypes = {
  video: PropTypes.object.isRequired,
  idField: PropTypes.oneOf(["id", "_id"]),
  subscription: PropTypes.object,
};

export default VideoItemWide;
