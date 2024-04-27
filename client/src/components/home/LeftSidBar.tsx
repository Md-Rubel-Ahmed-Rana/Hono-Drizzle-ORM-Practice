import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleIcon from "@mui/icons-material/Article";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Diversity2Icon from "@mui/icons-material/Diversity2";

const itemArray = [
  {
    icon: ArticleIcon,
    text: "Feed",
  },
  {
    icon: Diversity3Icon,
    text: "Friends",
  },
  {
    icon: PersonAddIcon,
    text: "Friend Request",
  },
  {
    icon: GroupAddIcon,
    text: "Sent Request",
  },
  {
    icon: Diversity2Icon,
    text: "Find Friend",
  },
];

type Props = {
  setSelectedItem: (value: string) => void;
};

const LeftSidBar = ({ setSelectedItem }: Props) => {
  const handleChangeItem = (text: string) => {
    setSelectedItem(text.toLowerCase());
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {itemArray.map((singleItem) => (
        <ListItemButton
          onClick={() => handleChangeItem(singleItem.text)}
          key={Math.random()}
        >
          <ListItemIcon>
            <singleItem.icon />
          </ListItemIcon>
          <ListItemText primary={singleItem.text} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default LeftSidBar;
