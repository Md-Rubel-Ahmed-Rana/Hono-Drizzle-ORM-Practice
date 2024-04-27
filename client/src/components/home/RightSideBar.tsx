import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ProfileCard from "../rightSideItems/ProfileCard";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import SettingsIcon from "@mui/icons-material/Settings";
import ItemSkeleton from "../skeletons/ItemSkeleton";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";

const itemsArray = [
  {
    icon: PhotoSizeSelectActualIcon,
    text: "Photos",
  },
  {
    icon: SmartDisplayIcon,
    text: "Videos",
  },
  {
    icon: Diversity1Icon,
    text: "Groups",
  },
  {
    icon: SettingsIcon,
    text: "Settings",
  },
];

type Props = {
  setSelectedItem: (value: string) => void;
  loading: boolean;
};

const RightSidBar = ({ setSelectedItem, loading }: Props) => {
  return (
    <div className="h-full overflow-hidden shadow-md">
      {loading ? <ProfileSkeleton /> : <ProfileCard />}

      {loading ? (
        <ItemSkeleton />
      ) : (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {itemsArray.map((item) => (
            <ListItemButton
              onClick={() => setSelectedItem(item.text)}
              key={Math.random()}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  );
};

export default RightSidBar;
