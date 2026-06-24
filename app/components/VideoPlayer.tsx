import React from "react";
import Button from "~/hkit/Button";
import { Play } from "lucide-react";

const VideoPlayer = () => {
  return (
    <video className="h-full w-full rounded-lg" poster="/poster.png" controls>
      <source
        src="/hh_video.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
