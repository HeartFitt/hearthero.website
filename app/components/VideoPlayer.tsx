import React from "react";
import Button from "~/hkit/Button";
import { Play } from "lucide-react";

const VideoPlayer = () => {
  return (
    <video className="h-full w-full rounded-lg" poster="/poster.png" controls>
      <source
        src="/copy_E2384F24-E88C-4280-AAA3-071CB308FEB6.mov"
        type="video/mov"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
