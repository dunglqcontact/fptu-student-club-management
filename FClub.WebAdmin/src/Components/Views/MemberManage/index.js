import { Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import ApproveList from "./Components/ApproveList";
import MemberList from "./Components/MemberList";

const MemberManage = ({ clubId, token }) => {
  const [isRefresh, setIsRefresh] = useState(false);

  function refreshHandler() {
    setIsRefresh((prev) => !prev);
  }

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Manage Member
      </Typography>
      <MemberList
        clubId={clubId}
        token={token}
        isRefresh={isRefresh}
        refreshHandler={refreshHandler}
      />
      <Divider sx={{ my: 5 }} />
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Approve Request
      </Typography>
      <ApproveList
        clubId={clubId}
        token={token}
        isRefresh={isRefresh}
        refreshHandler={refreshHandler}
      />
    </>
  );
};

export default MemberManage;
