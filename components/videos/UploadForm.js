import { useState } from "react";
import * as yup from "yup";
import useValidation from "../../hooks/useValidation";
import TextField from "../base/TextField";
import Button from "../base/Button";
import { uploadVideo } from "../../store/actions/videosActions";
import { useSelector, useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { fireToast } from "../../global/helpers";

const UploadForm = () => {
  // redux
  const dispatch = useDispatch();
  const serverError = useSelector(state => state.uiReducer.serverErrors.UploadForm);

  // form validation
  const { registerInput, wrapHandleSubmit, errors, reset } = useValidation({
    title: yup.string().required("Title is required"),
    tags: yup.string().required("Tags are required"),
    description: yup.string().required("Description is required"),
  });

  // video file
  const [videoFile, setVideoFile] = useState(null);
  const videoFileIsValid = () => {
    return videoFile && videoFile.size <= 1024 * 1024 * 11 && videoFile.type == "video/mp4";
  };
  const handleFileDrop = files => {
    setVideoFile(files[0]);
  };

  const handleSubmit = ({ title, tags, description }) => {
    if (!videoFileIsValid()) return fireToast("error", "Choose a valid file");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    dispatch(uploadVideo(formData));
    reset();
    setVideoFile(null);
  };

  return (
    <form onSubmit={wrapHandleSubmit(handleSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          {serverError && (
            <Alert className="bg-red-600" icon="fa fa-info-circle">
              {serverError}
            </Alert>
          )}

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
              <Dropzone onDrop={handleFileDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="mt-1 m-auto px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1">
                          <div className="text-center">
                            <i className="fa fa-photo-video fa-2x mx-auto h-12 w-12 text-gray-400"></i>
                            <div className="text-sm text-gray-600">
                              <p>
                                <span className="text-blue-600">Choose a file</span> or drag and drop
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">MP4 up to 10MB</p>
                          </div>
                          {videoFile && <p className="mt-3 text-sm text-gray-700 text-center">{videoFile.name}</p>}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <div className="mt-1 rounded-md">
                <TextField {...registerInput("title")} error={errors.title ? true : false} helperText={errors.title && errors.title.message} placeholder="Enter Video Title" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="mt-1  rounded-md">
                <TextField {...registerInput("tags")} error={errors.tags ? true : false} helperText={errors.tags && errors.tags.message} placeholder="Enter Video Tags" helperTextColor="text-blue-500" helperText="* Important for recommendations" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div className="mt-1 rounded-md">
                <TextField {...registerInput("description")} error={errors.description ? true : false} helperText={errors.description && errors.description.message} placeholder="Enter Video Description" textarea={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button type="submit" className="btn-blue">
            Upload
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
