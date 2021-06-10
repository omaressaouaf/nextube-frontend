import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../components/shared/ProgressBar";
import { cancelUploadVideo } from "../../store/actions/videosActions";
import Button from "../base/Button";

const UploadProgresses = () => {
  // redux
  const uploadProgresses = useSelector(state => Object.values(state.videosReducer.uploadProgresses));
  const dispatch = useDispatch();

  // request cancellation

  const handleCancel = source => {
    dispatch(cancelUploadVideo(source));
  };

  const cancellationAllowed = progress => {
    return progress.percentage < 100;
  };

  return uploadProgresses.length > 0 ? (
    <div className="mt-5 px-4 py-5 border-2 border-gray-300 rounded-md">
      <h2 className="text-blue-600">Uploading {uploadProgresses.length} video(s)</h2>
      {uploadProgresses.map(progress => (
        <div className="mr-4 my-3" key={progress.identifier}>
          <h4>{progress.title}</h4>
          <ProgressBar percentage={progress.percentage} />
          {cancellationAllowed(progress) && (
            <Button onClick={() => handleCancel(progress.source)} className="btn-red">
              cancel
            </Button>
          )}
        </div>
      ))}
    </div>
  ) : (
    ""
  );
};

export default UploadProgresses;
