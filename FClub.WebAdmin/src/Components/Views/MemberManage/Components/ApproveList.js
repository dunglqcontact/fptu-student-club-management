import React, { useEffect, useState } from "react";

import {
  Avatar,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import Label from "../../../UI/Label";
import Scrollbar from "../../../UI/Scrollbar";
import SearchNotFound from "../../../UI/SearchNotFound";
import { UserListToolbar } from "../../../UI/_dashboard/user";
import MemberListHead from "../../Club/ClubDetailComponents/DetailComponents/MemberListHead";
import { fVNDate } from "../../../../Utils/formatTime";
import MoreMenuApprove from "./MoreMenuApprove";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "birthday", label: "Birthday", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "", label: "", alignRight: false },
];

const ApproveList = ({ clubId, token, isRefresh, refreshHandler }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [membersData, setMembersData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const url = `https://club-management-service.azurewebsites.net/api/v1/members?PageNumber=${page}&PageSize=${rowsPerPage}&includeProperties=User&clubId=${clubId}&IsApproved=false`;
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((resData) => {
        const members = [];
        resData.data.map((row) => {
          return members.push({
            id: row.id,
            memberRole: row.roleId,
            email: row.user.email,
            name: row.user.name,
            photo: row.user.photo,
            gender: row.user.gender,
            age: row.user.birthday,
            status: row.user.status,
            isApproved: row.isApproved,
          });
        });
        setTotalCount(resData.metadata.totalCount);
        setMembersData(members);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, rowsPerPage, token, url, isRefresh]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = membersData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const getGender = (gender) => {
    if (gender === 1) return "Male";
    if (gender === 2) return "Female";
    if (gender === 3) return "Other";
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  const isUserNotFound = membersData.length === 0;
  return (
    <Card>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <MemberListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={membersData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {membersData.map((row) => {
                const { id, name, email, photo, age, gender, isApproved } = row;
                const isItemSelected = selected.indexOf(name) !== -1;

                return (
                  <TableRow
                    hover
                    key={id}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      padding="normal"
                      sx={{ pl: 2 }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={photo} />
                        <Typography variant="subtitle2" noWrap>
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{fVNDate(age)}</TableCell>
                    <TableCell align="left">{getGender(gender)}</TableCell>
                    <TableCell align="left">
                      <Label
                        variant="ghost"
                        color={isApproved ? "success" : "error"}
                      >
                        {isApproved ? "Approved" : "Not approve"}
                      </Label>
                    </TableCell>
                    <TableCell align="right">
                      <MoreMenuApprove
                        userId={id}
                        token={token}
                        refreshHandler={refreshHandler}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ApproveList;
