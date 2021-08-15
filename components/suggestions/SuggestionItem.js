import Link from "next/link";
import Image from "next/image";
import { formatDateAgo, formatVideoDuration } from "../../global/helpers";
import PropTypes from "prop-types";

const SuggestionItem = ({ video }) => {
  return (
    <div className="flex mb-2" key={video.id}>
      <Link href={`/videos/${video.id}`}>
        <a className="flex mb-2 relative">
          <Image
            placeholder="blur"
            blurDataURL={video.thumbnail}
            width={180}
            height={90}
            layout="fixed"
            src={video.thumbnail}
            className="mb-1 hover:opacity-75 transition-opacity"
            alt="thumbnail"
          />
          <div className="absolute bottom-2 right-1 p-1 text-xs font-semibold bg-lightBlack text-gray-200 rounded-sm">
            {formatVideoDuration(video.duration)}
          </div>
        </a>
      </Link>
      <div className="ml-2">
        <Link href={`/videos/${video.id}`}>
          <a className="flex mb-0 w-44 2xl:w-64">
            <div className="mb-2 w-full text-black dark:text-gray-200 break-words font-semibold">
              {video.title}
            </div>
          </a>
        </Link>
        <div className="text-sm">
          <Link href={`/channels/${video.user.channelName}`}>
            <a className="text-gray-600 capitalize hover:text-black dark:text-gray-400 dark:hover:gray-200">
              {video.user.channelName}
              <i className="fa fa-check-circle transition text-blue-500 ml-2"></i>
            </a>
          </Link>
        </div>
        <div className="text-sm dark:text-gray-400">
          {video.viewsCount} views &middot; {formatDateAgo(video.createdAt)}
        </div>
      </div>
    </div>
  );
};

SuggestionItem.propTypes = {
  video: PropTypes.object.isRequired,
};

export default SuggestionItem;
