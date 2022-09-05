import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Container, Divider, Typography } from "@mui/material";
import Page from "../../UI/Page";
import ActiveUserList from "./Components/UserManageComponent";
import InactiveUserList from "./Components/InactiveUserList";

const UserManage = () => {
  const token = useSelector((state) => state.auth.token);

  const [isRefresh, setIsRefresh] = useState(false);
  function refreshHandler() {
    setIsRefresh((prev) => !prev);
  }

  return (
    <Page title="User Management">
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Users Management
        </Typography>
        <ActiveUserList
          token={token}
          refreshHandler={refreshHandler}
          isRefresh={isRefresh}
        />
        <Divider sx={{ my: 5 }} />

        <InactiveUserList
          token={token}
          refreshHandler={refreshHandler}
          isRefresh={isRefresh}
        />
      </Container>
    </Page>
  );
};

export default UserManage;
