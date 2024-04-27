import React, { useState } from "react";
import LeftSidBar from "./LeftSidBar";
import MiddleComponent from "./MiddleComponent";
import RightSideBar from "./RightSideBar";
import Friends from "../leftSideItems/Friends";
import FriendRequests from "../leftSideItems/FriendRequests";
import SentRequests from "../leftSideItems/SentRequests";
import FindFriends from "../leftSideItems/FindFriends";
import LeftSideSkeleton from "../skeletons/ItemSkeleton";

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState("feed");
  const [loading, setLoading] = useState(false);
  return (
    <section className="flex justify-between gap-3 my-5">
      <div className="w-3/12 shadow-md h-screen">
        {loading ? (
          <LeftSideSkeleton />
        ) : (
          <LeftSidBar setSelectedItem={setSelectedItem} />
        )}
      </div>
      <div className="w-6/12 shadow-md">
        {selectedItem === "feed" && <MiddleComponent />}
        {selectedItem === "friends" && <Friends />}
        {selectedItem === "friend request" && <FriendRequests />}
        {selectedItem === "sent request" && <SentRequests />}
        {selectedItem === "find friend" && <FindFriends />}
      </div>
      <div className="w-3/12 shadow-md h-screen">
        <RightSideBar setSelectedItem={setSelectedItem} loading={loading} />
      </div>
    </section>
  );
};

export default HomePage;
