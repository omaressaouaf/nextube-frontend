import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../components/shared/ProgressBar";
import { cancelUploadVideo } from "../../store/actions/videosActions";
import Button from "../base/Button";
import FlipMove from "react-flip-move";

const UploadProgresses = () => {
  // redux
  const uploadProgresses = useSelector(state =>
    Object.values(state.videosReducer.uploadProgresses)
  );
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
      <FlipMove
        appearAnimation="accordionVertical"
        enterAnimation="accordionVertical"
        leaveAnimation="accordionVertical"
      >
        {uploadProgresses.map(progress => (
          <div className="mr-4 my-5" key={progress.identifier}>
            <h4 className="break-words">{progress.title}</h4>
            <ProgressBar percentage={progress.percentage} />
            {cancellationAllowed(progress) && (
              <Button onClick={() => handleCancel(progress.source)} variant="red">
                cancel
              </Button>
            )}
          </div>
        ))}
      </FlipMove>
    </div>
  ) : (
    ""
  );
};

export default UploadProgresses;
