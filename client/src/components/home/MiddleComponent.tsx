import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PostCreateForm from "../shared/PostCreateForm";

const MiddleComponent = () => {
  const [isPost, setIsPost] = useState(false);

  return (
    <div>
      {!isPost && (
        <div className="text-center shadow-md p-4 mb-5 flex justify-between">
          <Typography variant="h5">
            Would you like to share your thoughts?
          </Typography>
          <Button variant="contained" onClick={() => setIsPost(true)}>
            Post Now
          </Button>
        </div>
      )}

      {isPost && <PostCreateForm setIsPost={setIsPost} />}
    </div>
  );
};

export default MiddleComponent;
