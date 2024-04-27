/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const ProfileSkeleton = () => {
  return (
    <Box className="px-2" sx={{ width: 310 }}>
      <Skeleton variant="rectangular" width={310} height={118} />
      <Box width={310} sx={{ pt: 0.5 }}>
        <Skeleton />
        <div className="flex justify-between gap-5">
          <Skeleton width={160} />
          <Skeleton width={160} />
        </div>
      </Box>
    </Box>
  );
};

export default ProfileSkeleton;
