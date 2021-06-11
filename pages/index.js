import Layout from "../components/layouts/Layout";
import axios from "axios";
import { serializeServerError } from "../global/helpers";
import VideosList from "../components/videos/VideosList";

const Home = ({ data, serverError }) => {
  return (
    <Layout>
      <VideosList data={data} serverError={serverError} />
    </Layout>
  );
};

export const getServerSideProps = async context => {
  let data = null;
  let serverError = null;
  try {
    const res = await axios.get("/videos");
    data = res.data;
  } catch (err) {
    serverError = serializeServerError(err);
    console.log(serverError);
  }
  return {
    props: {
      data,
      serverError,
    },
  };
};

export default Home;
