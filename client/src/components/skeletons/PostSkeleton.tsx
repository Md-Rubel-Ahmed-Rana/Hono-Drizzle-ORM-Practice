import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const PostSkeleton = () => {
  return (
    <div className="px-2 flex flex-col gap-10">
      {Array.from({ length: 5 }).map((index) => (
        <div className="shadow-sm p-3 rounded-md" key={Math.random()}>
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
              <Skeleton width="30%">
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" />
            </Box>
            <Skeleton />
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%" }}
              height={118}
            />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
