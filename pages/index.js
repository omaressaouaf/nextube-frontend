import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../components/base/Avatar";
import Layout from "../components/layouts/Layout";
import withAuth from "../components/HOC/withAuth";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 34, 6546, 4343, 55, 23, 66, 6234, 6562, 54, 23435343, 767, 24]);
  useEffect(() => {
    axios
      .get("/")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <Layout>
      {/* content Start */}
      <div>
        <p className="font-semibold mb-6">Recommended videos</p>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6">
          {videos.map(video => {
            return (
              <div className="video-preview mb-5" key={video}>
                <Link href={`/videos/${video}`}>
                  <a>
                    <Image width={500} height={300} src="https://ytexpert.net/wp-content/uploads/2019/11/How-To-Make-An-Eye-Catching-Thumbnail-For-More-Clicks-862x485.jpg" className="mb-1 hover:opacity-75 transition-opacity" alt="" />
                  </a>
                </Link>
                <div className="flex items-start mt-4">
                  <Avatar className="w-7 mr-3 mt-1" />

                  <div>
                    <div className="mb-2 w-full">
                      <Link href={`/videos/${video}`}>
                        <a className="text-black font-semibold w-full">How to make an an awesome thumbnail</a>
                      </Link>
                    </div>
                    <div className="text-sm">
                      <Link href={`/videos/${video}`}>
                        <a className="text-gray-600 hover:text-black">
                          TheRussianGenuis <i className="fa fa-check-circle transition "></i>
                        </a>
                      </Link>
                    </div>
                    <div className="text-sm text-gray-600">245k views &middot; 3 days ago</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* content End */}
    </Layout>
  );
};

export default withAuth(Home);
