import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fireConfirm, formatVideoDuration } from "../../global/helpers";
import { deleteVideo, fetchStudioVideos } from "../../store/actions/videosActions";
import { Table, Td } from "../base/Table";
import Image from "next/image";
import Link from "next/link";
import Modal from "../base/Modal";
import { useState } from "react";
import VideoForm from "./VideoForm";

const VideosTable = () => {
  const [videos, loading] = useSelector(state => [
    state.videosReducer.videos,
    state.uiReducer.loadings["VideosTable"],
  ]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudioVideos());
  }, []);

  const handleDelete = videoId => {
    fireConfirm(() => {
      dispatch(deleteVideo(videoId));
    });
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedVideo, setEditedVideo] = useState(null);

  const handleEdit = video => {
    setEditedVideo(video);
    setEditModalOpen(true);
  };

  return (
    <>
      <Table
        headings={[
          "Title",
          "Thumbnail",
          "Duration",
          "Category",
          "Views",
          "Likes",
          "Dislikes",
          "Actions",
        ]}
      >
        {loading ? (
          <tr className="py-5">
            <td className="text-center py-10" colSpan="8">
              <i className="fa fa-spinner fa-spin fa-3x text-gray-500 dark:text-gray-400"></i>
            </td>
          </tr>
        ) : (
          videos.map(video => {
            return (
              <tr key={video.id}>
                <Td>{video.title}</Td>
                <Td>
                  <Image src={video.thumbnail} width={90} height={50} layout="fixed" />
                </Td>
                <Td>
                  <span
                    className="px-2 inline-flex text-xs leading-5 rounded bg-gray-200 dark:bg-darkGray
              text-gray-600 dark:text-gray-200 font-semibold"
                  >
                    {formatVideoDuration(video.duration)}
                  </span>
                </Td>
                <Td>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                    {video.category}
                  </span>
                </Td>
                <Td>{video.viewsCount}</Td>
                <Td>{video.likes.length}</Td>
                <Td>{video.dislikes.length}</Td>

                <Td>
                  <div className="space-x-5">
                    <Link href={`/videos/${video.id}`}>
                      <a>
                        <i className="fa fa-eye text-blue-600"></i>
                      </a>
                    </Link>
                    <i
                      onClick={() => handleEdit(video)}
                      className="fa fa-edit text-green-600 cursor-pointer"
                    ></i>
                    <i
                      onClick={() => handleDelete(video.id)}
                      className="fa fa-trash text-red-500 cursor-pointer"
                    ></i>
                  </div>
                </Td>
              </tr>
            );
          })
        )}
      </Table>
      <Modal title="Edit Video Info" modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
        <div className="flex align-center justify-around py-10">
          <VideoForm editedVideo={editedVideo} setEditModalOpen={setEditModalOpen} />
        </div>
      </Modal>
    </>
  );
};

export default VideosTable;
