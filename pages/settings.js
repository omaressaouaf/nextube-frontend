import { useSelector } from "react-redux";
import ChannelTopBar from "../components/channels/ChannelTopBar";
import withAuth from "../components/HOC/withAuth";
import MetaData from "../components/layouts/MetaData";
import SettingsWrapper from "../components/settings/SettingsWrapper";

const settings = () => {
  // redux
  const authUser = useSelector(state => state.authReducer.authUser);

  return (
    <>
      <MetaData title="Settings" />
      {authUser && <ChannelTopBar user={authUser} />}
      <div className="container mx-auto px-10 py-5">
        <SettingsWrapper />
      </div>
    </>
  );
};

export default withAuth(settings);
