import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import avatar from "../../../public/images/userAvatar.png";
import Image from "next/image";

const ProfileCard = () => {
  return (
    <Card
      variant="outlined"
      className="flex flex-col justify-center items-center"
      sx={{ maxWidth: 345 }}
    >
      <Image src={avatar} alt="Profile image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Md Rubel Ahmed Rana
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Followers</Button>
          <Button variant="outlined">Following</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
