import React from "react";
import { Typography, Paper, Skeleton, Avatar, Chip } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerifiedIcon from "@mui/icons-material/Verified";

const UserInfo = ({ userData, loading }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "fit-content",
        borderRadius: 3,
        py: 2,
        pl: 2,
        pr: 10,
        m: 1,
        borderBottom: 5,
        borderBottomColor: "cornflowerblue",
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="circular" width={90} height={90} />
          <Skeleton width={100} height={20} />
          <Skeleton width={150} height={20} />
          <Skeleton width={150} height={20} />
          <Skeleton width={100} height={20} />
        </>
      ) : (
        <>
          <Avatar
            alt={userData?.username}
            src={userData?.photoURL}
            sx={{ width: 90, height: 90, border: 1 }}
          />
          <Typography component="h3" variant="span" sx={{ fontWeight: 500 }}>
            {userData?.username}
          </Typography>
          <Typography
            component="h5"
            variant="span"
            sx={{ fontWeight: 500, display: "flex", gap: 1 }}
          >
            <MailOutlineIcon fontSize="small" /> {userData?.email}
          </Typography>
          <Typography
            component="h5"
            variant="span"
            sx={{ fontWeight: 500, display: "flex", gap: 1 }}
          >
            <ShoppingCartIcon fontSize="small" /> No. of Products :{" "}
            {userData?.products?.length}
          </Typography>
          <Typography
            component="h5"
            variant="span"
            sx={{ fontWeight: 500, display: "flex", gap: 1 }}
          >
            <VerifiedIcon fontSize="small" /> Verified{" "}
            <Chip
              label={userData?.verified ? "Yes" : "No"}
              color={userData?.verified ? "success" : "error"}
              size="small"
            />
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default UserInfo;
