/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  setIsPost: (value: boolean) => void;
};

const PostCreateForm: React.FC<Props> = ({ setIsPost }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !description) {
      console.error("Please fill in all fields");
      return;
    }
    // You can perform data submission or further processing here
    console.log({ title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Create Post</Typography>
      <TextField
        required
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        autoFocus
      />
      <TextField
        required
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <div className="flex justify-end items-center gap-2">
        <Button variant="outlined" onClick={() => setIsPost(false)}>
          Cancel
        </Button>
        <Button
          className="px-10"
          variant="contained"
          color="primary"
          type="submit"
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default PostCreateForm;
