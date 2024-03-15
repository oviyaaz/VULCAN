import * as React from "react";
import { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { CardContent } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import "react-toastify/dist/ReactToastify.css";

export interface PageResponse {
  content: Array<any>;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DEEDFF",
    // background: "linear-gradient(180deg, #0484c4, white)",
    color: "#1C1C1C",
    fontSize: 16,
    fontWeight: 700,
    padding: "10px 16px 8px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd,even)": {
    borderCollapse: "separate",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function PaginatedTable(props: {
  renderRow: (row: any, refresh: () => void) => JSX.Element;
  update?: () => void;
  refresh?: boolean;
  renderHeader: () => JSX.Element;
  fetchHandler: (pageNo: number, pageSize: number) => Promise<any | undefined>;
}) {
  const [rows, setRows] = React.useState<PageResponse>({
    totalPages: 0,
    totalElements: 0,
    last: false,
    first: false,
    content: [],
  });
  const [page, setPage] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [paginationCount, setPaginationCount] = React.useState(0);
  const dataFetchedRef = React.useRef(false);
  const [isFetch, setIsFetch] = React.useState(false);
  const theme = useTheme();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    if (refresh) props.update && props.update();
  }, [refresh]);

  useEffect(() => {
    if (isFetch) {
      props.fetchHandler(page, rowsPerPage).then((res) => {
        console.log(res, "questions");
        setRows(res.payload);
        setPaginationCount(res?.payload.totalElements);
      });
      setRefresh(false);
    }
  }, [page, props, props.fetchHandler, rowsPerPage, refresh, props.refresh]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    props.fetchHandler(page, rowsPerPage).then((res) => {
      setRows(res);
      setPaginationCount(res.payload.totalElements);
    });
    setIsFetch(true);
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", borderRadius: "20px 20px 10px 10px", height: "380px", overflowY: "scroll" }}
    >
      <Table aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0, zIndex: 100 }}>{props.renderHeader()}</TableHead>
        <TableBody>
          {rows?.content?.length === 0 ? (
            <CardContent>
              <p style={{ textAlign: "center" }}>No data found</p>
            </CardContent>
          ) : (
            rows?.content?.map((row: any) => {
              return (
                row &&
                props.renderRow(row, () => {
                  setRefresh(true);
                  // props.fetchHandler(page, rowsPerPage).then((res) => {
                  //     setRows(res);
                  //     setPaginationCount(res.totalElements);
                  // });
                })
              );
            })
          )}
        </TableBody>
      </Table>
      <div style={{
        position: "sticky",
        bottom: 0
      }}>
        <TablePagination
          sx={{
            backgroundColor: "#DEEDFF",
            color: "#1C1C1C",
            fontSize: 16,
            fontWeight: 700,

          }}
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={paginationCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </TableContainer>
  );
}
