import Avatar from "../base/Avatar";
import PropTypes from "prop-types";
import VideoItemWide from "../videos/VideoItemWide";

function SubscriptionVideoItem({ subscription }) {
  return (
    <div className="subscription-video-item">
      <div className="flex items-center mb-5">
        <Avatar src={subscription.user.avatar} size={50} className="mr-2" />
        <p className="text-gray-800 dark:text-gray-200 font-semibold">
          {subscription.user.channelName}
        </p>
      </div>
      {subscription.videos.map(video => {
        return (
          <div key={video._id} className="max-w-5xl">
            <VideoItemWide
              video={video}
              idField="_id"
              subscription={subscription}
            />
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
