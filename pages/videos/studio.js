import { useSelector } from "react-redux";
import ChannelTopBar from "../../components/channels/ChannelTopBar";
import withAuth from "../../components/HOC/withAuth";
import MetaData from "../../components/layouts/MetaData";
import VideosTable from "../../components/videos/VideosTable";

const studio = () => {
  // redux
  const authUser = useSelector(state => state.authReducer.authUser);

  return (
    <>
      <MetaData title="Studio" />
      <ChannelTopBar user={authUser} />
      <div className="container mx-auto px-10 py-5">
        <p className="font-semibold mb-6">Studio Management</p>
        <VideosTable />
      </div>
    </>
  );
};

export default withAuth(studio);
