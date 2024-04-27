import React, { useState } from "react";
import MiddleComponent from "./MiddleComponent";
import Friends from "../leftSideItems/Friends";
import FriendRequests from "../leftSideItems/FriendRequests";
import SentRequests from "../leftSideItems/SentRequests";
import FindFriends from "../leftSideItems/FindFriends";
import LeftSideSkeleton from "../skeletons/ItemSkeleton";
import LeftSidBar from "./LeftSidBar";
import RightSidBar from "./RightSideBar";

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState("feed");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex mt-5">
      {/* Left Sidebar */}
      <div className="w-3/12 h-full  overflow-hidden pb-5 mx-2 sticky top-28 bg-white z-10">
        {loading ? (
          <LeftSideSkeleton />
        ) : (
          <LeftSidBar setSelectedItem={setSelectedItem} />
        )}
      </div>

      {/* Middle Component */}
      <div
        className="w-6/12 h-full overflow-y-auto mt-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div style={{ overflowY: "scroll", paddingRight: "0px" }}>
          {selectedItem === "feed" && <MiddleComponent />}
          {selectedItem === "friends" && <Friends />}
          {selectedItem === "friend request" && <FriendRequests />}
          {selectedItem === "sent request" && <SentRequests />}
          {selectedItem === "find friend" && <FindFriends />}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-3/12 h-full overflow-y-auto sticky top-28 mx-2 bg-white z-10">
        <RightSidBar setSelectedItem={setSelectedItem} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
