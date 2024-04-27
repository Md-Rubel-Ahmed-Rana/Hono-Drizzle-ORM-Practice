import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

const ItemSkeleton = () => {
  return (
    <div className="px-2">
      {Array.from({ length: 5 }).map((index: any) => (
        <div key={Math.random() + index}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ margin: 1 }}>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default ItemSkeleton;
