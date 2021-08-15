import React from "react";
import PropTypes from "prop-types";
import Avatar from "../base/Avatar";
import Link from "next/link";
import SubscriptionButton from "./SubscriptionButton";
import { formatDateNormal, truncateString } from "../../global/helpers";

const SubscriptionItem = ({ subscription: { subscribedTo } }) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap mb-2 gap-2" key={subscribedTo.id}>
      <div className="flex items-start justify-center w-80">
        <Link href={`/channels/${subscribedTo.id}`}>
          <a className="mb-2">
            <Avatar
              width={150}
              height={150}
              src={subscribedTo.avatar}
              className="mb-1 hover:opacity-75 transition-opacity"
              alt="avatar"
            />
          </a>
        </Link>
      </div>
      <div className="">
        <Link href={`/channels/${subscribedTo.channelName}`}>
          <a className="flex mb-3">
            <div className="w-full text-black dark:text-gray-200 capitalize font-semibold">
              {subscribedTo.channelName}
              <i className="fa fa-check-circle transition text-blue-500 ml-2 mr-1"></i>
            </div>
          </a>
        </Link>
        <div className="text-sm">
          <div className="text-gray-600 capitalize hover:text-black dark:text-gray-400 dark:hover:gray-200">
            {subscribedTo.subscribersCount} subscribers &middot; Joined On{" "}
            {formatDateNormal(subscribedTo.createdAt)}
          </div>
        </div>
        <div className="text-sm dark:text-gray-400 mt-1">
          {truncateString(
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ad, libero sunt eligendi, ipsam suscipit distinctio minus doloribus, iure quae aspernatur fuga labore inventore optio autem provident voluptatibus perferendis? Sunt?"
          )}
        </div>
      </div>

      <div className="flex items-start justify-center w-80">
        <SubscriptionButton userId={subscribedTo.id} />
      </div>
    </div>
  );
};

SubscriptionItem.propTypes = {
  subscription: PropTypes.object.isRequired,
};

export default SubscriptionItem;
