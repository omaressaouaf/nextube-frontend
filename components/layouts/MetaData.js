import Head from "next/head";
import PropTypes from "prop-types";

const MetaData = ({ title }) => {
  return (
    <Head>
      <title>{title && `${title} -`} NexTube </title>
      <meta name="description" content="A video streaming app where you can share your videos" />
      <link rel="icon" href="/logo.png" />
    </Head>
  );
};

MetaData.propTypes = {
  title: PropTypes.string,
};

export default MetaData;
