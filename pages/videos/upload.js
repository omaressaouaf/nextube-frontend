import Layout from "../../components/layouts/Layout";
import withAuth from "../../components/HOC/withAuth";
import UploadProgresses from "../../components/videos/UploadProgresses";
import UploadForm from "../../components/videos/UploadForm";

const upload = () => {
  return (
    <Layout title="Upload">
      <div className="mt-9">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Video Upload</h3>
              <p className="mt-1 text-sm text-gray-600">This video will be displayed publicly so be careful what you share.</p>
              <UploadProgresses />
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <UploadForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(upload);
