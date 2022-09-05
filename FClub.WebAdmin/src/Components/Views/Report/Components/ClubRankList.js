import React, { useEffect, useState } from "react";
import { filter } from "lodash";

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
import MemberListHead from "../../Club/ClubDetailComponents/DetailComponents/MemberListHead";
import RankListToolbar from "./ClubListToolbar";

const TABLE_HEAD = [
  { id: "name", label: "Club Name", alignRight: false },
  { id: "member", label: "Members", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
];

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const ClubRankList = ({ token }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clubsData, setClubsData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetch(
      "https://club-management-service.azurewebsites.net/api/v1/clubs/rank",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((resData) => {
        const clubs = [];
        resData.map((row) => {
          return clubs.push({
            id: row.key.id,
            value: row.value,
            name: row.key.name,
            photo: row.key.logo,
            status: row.key.status,
          });
        });
        setTotalCount(clubs.length);
        setClubsData(clubs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, rowsPerPage, token]);

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
      const newSelecteds = clubsData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredClubs = applySortFilter(
    clubsData,
    getComparator(order, orderBy),
    filterName
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  const isCLubNotFound = clubsData.length === 0;

  return (
    <Card>
      <RankListToolbar isClub={true} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <MemberListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={clubsData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredClubs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, name, photo, value, status } = row;
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
                      <TableCell align="left">{value}</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={status ? "success" : "error"}
                        >
                          {status ? "Active" : "Inactive"}
                        </Label>
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
            {isCLubNotFound && (
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

export default ClubRankList;
