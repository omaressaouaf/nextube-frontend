import withAuth from "../../components/HOC/withAuth";
import UploadProgresses from "../../components/videos/UploadProgresses";
import VideoForm from "../../components/videos/VideoForm";
import MetaData from "../../components/layouts/MetaData";

const upload = () => {
  return (
    <div className="mt-9">
      <MetaData title="Upload"/>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">Video Upload</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">This video will be displayed publicly so be careful what you share</p>
            <UploadProgresses />
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <VideoForm />
        </div>
      </div>
    </div>
  );
};

export default withAuth(upload);
