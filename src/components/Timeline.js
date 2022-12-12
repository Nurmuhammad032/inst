import React from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../CustomHooks/usePhotos";
import Post from "./createContent/index";

const Timeline = () => {
  const { photos } = usePhotos();
  return (
    <div className="container col-span-2 max-w-[85%] mx-auto">
      {!photos ? (
        <>
          <Skeleton count={1} width={640} height={400} className="mb-5" />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">No followers yet!</p>
      )}
    </div>
  );
};

export default Timeline;
