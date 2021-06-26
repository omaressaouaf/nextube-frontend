import Link from "next/link";
import Image from "next/image";
import Avatar from "../base/Avatar";
import { formatDateAgo } from "../../global/helpers";
import PropTypes from "prop-types";

function SubscriptionVideoItem({ subscription }) {
  return (
    <div className="subscription-video-item">
      <div className="flex items-center mb-5">
        <Avatar src={subscription.user.avatar} className="w-10 mr-2" />
        <p className="text-gray-800 dark:text-gray-200 font-semibold capitalize">
          {subscription.user.channelName}
        </p>
      </div>
      {subscription.videos.map(video => {
        return (
          <div className="flex mb-2 flex-wrap" key={video._id}>
            <Link href={`/videos/${video._id}`}>
              <a className="flex mb-2">
                <Image
                  width={280}
                  height={150}
                  layout="fixed"
                  src={video.thumbnail}
                  className="mb-1 hover:opacity-75 transition-opacity"
                  alt="thumbnail"
                />
              </a>
            </Link>
            <div className="ml-2">
              <Link href={`/videos/${video._id}`}>
                <a className="flex mb-0">
                  <div className=" w-full text-black dark:text-gray-200 font-semibold">
                    {video.title}
                  </div>
                </a>
              </Link>
              <div className="text-sm">
                <Link href="#">
                  <a className="text-gray-600 capitalize hover:text-black dark:text-gray-400 dark:hover:gray-200">
                    {subscription.user.channelName}
                    <i className="fa fa-check-circle transition text-blue-500 ml-2 mr-1"></i>
                    &middot; {video.viewsCount} views &middot; {formatDateAgo(video.createdAt)}
                  </a>
                </Link>
              </div>
              <div className="text-sm dark:text-gray-400 mt-3">{video.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

SubscriptionVideoItem.propTypes = {
  subscription: PropTypes.object.isRequired,
};

export default SubscriptionVideoItem;
