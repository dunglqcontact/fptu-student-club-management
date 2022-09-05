import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemberManage from "../../Components/Views/MemberManage";
import { getClubCode } from "../../Components/Views/MemberManage/Components/action";
import Page from "../../Components/UI/Page";
import { Container } from "@mui/material";

const MangageUserPage = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const [clubId, setClubId] = useState("");

  useEffect(() => {
    getClubCode(token, userId).then((response) => {
      setClubId(response);
    });
  }, [token, userId]);

  return (
    <Page>
      <Container>
        {clubId !== "" && <MemberManage clubId={clubId} token={token} />}
      </Container>
    </Page>
  );
};

export default MangageUserPage;
