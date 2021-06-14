import Skeleton from "react-loading-skeleton";

const VideoSingleSkeleton = () => {
  return (
    <>
      <div className="mb-1">
        <Skeleton height={10} width={400} />
        <br />
        <Skeleton height={6} width={200} />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Skeleton circle={true} height={30} width={30} />
        <Skeleton circle={true} height={30} width={30} />
        <Skeleton circle={true} height={30} width={30} />
        <Skeleton circle={true} height={30} width={30} />
      </div>

      <hr className="my-5" />
      <div className="video-description flex items-start flex-wrap md:flex-nowrap  justify-between">
        <div className="flex items-start order-2 md:order-1">
          <Skeleton circle={true} height={50} width={50} />

          <div className="text-sm mt-3 ml-2">
            <div className="mb-1">
              <Skeleton height={4} width={80} />
            </div>
            <div className="mb-1">
              <Skeleton height={4} width={50} />
            </div>
          </div>
        </div>
        <div className="ml-auto order-1 md:order-2">
          <Skeleton height={40} width={110} />
        </div>
      </div>
    </>
  );
};

export default VideoSingleSkeleton;
