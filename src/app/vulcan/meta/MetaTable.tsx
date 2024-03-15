"use client";

import PaginatedTable, {
  StyledTableCell,
  StyledTableRow,
} from "@/app/vulcan/table/PaginatedTable";
import { CurrentUser } from "@/service/ServerDetail";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import React, { useEffect } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import "react-toastify/dist/ReactToastify.css";
import { Synonym } from "./MetaSchema";
import { EnumConfig } from "../chip/EnumChip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { synonymDelete } from "@/service/meta/MetaService";
//   import { handleDelete } from "../../service/ApiService";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import styles from "@/app/page.module.css";
import { synonymUpdate } from "@/service/meta/MetaService";
import { getUser } from "../workspace/WorkspaceListLayout";
import { getTable } from "@/service/meta/MetaService";

function renderRow(row: Synonym, refresh: () => void) {
  return <SynonymTableData row={row} refresh={refresh} />;
}

function SynonymTableData(props: { row: Synonym; refresh: () => void }) {
  // console.log("Synonym row", props.row)
  const { row } = props;
  const enumConfig = new EnumConfig();
  const [open, setOpen] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isSynonymFocused, setIsSynonymFocused] = React.useState(false);
  const [isContainerFocused, setIsContainerFocused] = React.useState(false);
  const [isFieldFocused, setIsFieldFocused] = React.useState(false);
  const [name, setName] = React.useState("");
  const [user, setUser] = React.useState<CurrentUser>();
  useEffect(() => {
    const user = getUser();
    setUser(user);
    // handleWorkspaceList(user);
  }, []);

  const DeleteModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    // border: '0px solid #000',
    borderRadius: "20px",
    boxShadow: 24,
    padding: "40px 40px 40px 40px",
  };

  const EditModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    // border: '0px solid #000',
    borderRadius: "20px",
    boxShadow: 24,
    padding: "40px 40px 40px 40px",
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const deleteHandler = (synonymId: number) => {
    setAnchorElUser(null);
    user && synonymDelete(user, synonymId);
    //   ApiService.handleDelete(
    //     url.SERVER_URL +
    //     "meta/deleteSynonym/" +
    //     synonymId +
    //     "?tenantId=" +
    //     ApiService.getTenantId()
    //   ).then((response: any) => console.log("Response", response));
    //   toast.success("Deleted Successfully", {
    //     position: "bottom-left",
    //     autoClose: 500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    props.refresh();
    setIsDelete(false);
  };

  const formik = useFormik({
    initialValues: {
      url: "",
      synonymId: props.row.synonymId,
      synonym: props.row.synonym,
      container: props.row.container?.containerName,
      field: props.row.item?.itemName,
    },
    // validationSchema: validationSchema,
    onSubmit: async () => {
      console.log("Onsubmit");
      let sorSynonymBody = {
        synonymId: formik.values.synonymId,
        synonymName: formik.values.synonym,
      };
      handleCloseUserMenu();
      user && synonymUpdate(user);
      // ApiService.handleUpdate(
      //   url.SERVER_URL + "meta/synonym?tenantId=" + ApiService.getTenantId(),
      //   sorSynonymBody
      // ).then((response) => {
      //   toast.success("Synonym Edited Successfully", {
      //     position: "bottom-left",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      //   console.log("Successfully edited", response);
      // });
      props.refresh();
      setIsEdit(false);
    },
  });

  return (
    <>
      <StyledTableRow
        key={row.synonymId}
        sx={{ "& > *": { borderBottom: "unset", padding: "0" } }}
      >
        <StyledTableCell align="left" component="th" scope="row">
          {row.synonym}
        </StyledTableCell>
        <StyledTableCell align="left" sx={{ padding: "0" }}>
          {row.container?.containerName}
        </StyledTableCell>
        <StyledTableCell align="left" sx={{ padding: "0" }}>
          {row.item?.itemName}
        </StyledTableCell>
        <StyledTableCell align="left">
           {row.truthEntity?.document.documentName}
        </StyledTableCell>
        <StyledTableCell>
          {row.truthEntity?.truthEntity}
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ padding: "0" }}>
          {row.questions.length}
        </StyledTableCell>
        {/* <StyledTableCell align="center" sx={{ padding: "0" }}>
          0
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ padding: "0" }}>
          0
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ padding: "0" }}>
          0
        </StyledTableCell> */}
        <StyledTableCell align="center" sx={{ padding: "0" }}>
          {enumConfig.createFeatureChip(row.feature ? row.feature : "")}
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ padding: "0" }}>
          <IconButton onClick={handleOpenUserMenu}>
            <MoreVertIcon style={{ color: "#0055B4" }} />
          </IconButton>
          <Menu
            // sx={{ mt: "20px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              sx={{ justifyContent: "center" }}
              onClick={() => setIsEdit(true)}
            >
              Edit
            </MenuItem>
            <MenuItem
              sx={{ justifyContent: "center" }}
              onClick={() => setIsDelete(true)}
            >
              Delete
            </MenuItem>
          </Menu>
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ padding: "0" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            disabled={row.questions.length === 0}
            onClick={() => setOpen(!open)}
            style={{
              color: row.questions.length === 0 ? "#c7c7c7" : "#0055B4",
            }}
          >
            {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>

      {open && (
        <StyledTableRow>
          <StyledTableCell className={styles.styled__table__cell} colSpan={10}>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              className={styles.collapse}
            >
              <Box className={styles.box__margin} sx={{ padding: "20px" }}>
                <TableContainer
                  component={Paper}
                  className={styles.table__container}
                >
                  <Table aria-label="simple table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell
                          colSpan={4}
                          className={styles.questions__sub__table}
                        >
                          Question
                        </StyledTableCell>
                        <StyledTableCell align="right">Low</StyledTableCell>
                        <StyledTableCell align="center">High</StyledTableCell>
                        <StyledTableCell align="left">Zero</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {row.questions.map((ques) => {
                        return (
                          <StyledTableRow key={ques.question}>
                            <StyledTableCell colSpan={4}>
                              {ques.question}
                            </StyledTableCell>
                            <StyledTableCell align="right">0</StyledTableCell>
                            <StyledTableCell align="center">0</StyledTableCell>
                            <StyledTableCell align="left">0</StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
      )}

      <Modal
        open={isDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={DeleteModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "25px" }}
          >
            Do you want to delete?
          </Typography>
          <Grid sx={{ textAlign: "end" }}>
            <Button
              variant="contained"
              sx={{
                width: "15%",
                margin: 1,
                transform: "None",
                maxHeight: "40px",
              }}
              onClick={() => deleteHandler(row.synonymId)}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "15%",
                margin: 1,
                transform: "None",
                maxHeight: "40px",
              }}
              onClick={() => {
                setIsDelete(false);
                setAnchorElUser(null);
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={isEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container gap={2} sx={EditModalStyle}>
            <Grid xs={16} sx={{ display: "flex", flexDirection: "row" }}>
              <Grid xs={8}>
                <TextField
                  sx={{ width: "95%" }}
                  autoFocus
                  name="container"
                  label="Container"
                  // inputProps={{ className: classes.name }}
                  defaultValue={formik.values.container}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={8}>
                <TextField
                  sx={{ width: "100%" }}
                  autoFocus
                  name="field"
                  label="Field"
                  defaultValue={formik.values.field}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={16} sx={{ display: "flex", flexDirection: "row" }}>
              <Grid xs={8}>
                <TextField
                  sx={{ width: "71%" }}
                  autoFocus
                  name="synonym"
                  label="Synonym"
                  // inputProps={{ className: classes.name }}
                  defaultValue={formik.values.synonym}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
            <Grid
              xs={16}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "300px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100px",
                  transform: "None",
                  maxHeight: "40px",
                  marginRight: "20px",
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "100px",
                  transform: "None",
                  maxHeight: "40px",
                }}
                onClick={() => {
                  setIsEdit(false);
                  setAnchorElUser(null);
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

function RenderHeader() {
  return (
    <StyledTableRow>
      <StyledTableCell width={"15%"} align="left">
        Synonym
      </StyledTableCell>
      <StyledTableCell width={"15%"} align="left">
        Container
      </StyledTableCell>
      {/*<StyledTableCell align="left">Truth Entity</StyledTableCell>*/}
      <StyledTableCell width={"15%"} align="left">
        Field
      </StyledTableCell>
      <StyledTableCell width={"15%"} align="left">
        Document
      </StyledTableCell>
      <StyledTableCell width={"15%"} align="left">
        Entity
      </StyledTableCell>
      <StyledTableCell width={"10%"} align="center">
        Question Count
      </StyledTableCell>
      {/* <StyledTableCell colSpan={3} align="center">
        Touch Count
        <Grid className={styles.spaces}>
          <StyledTableCell>Zero</StyledTableCell>
          <hr />
          <StyledTableCell align="center">Low</StyledTableCell>
          <hr />
          <StyledTableCell align="center">High</StyledTableCell>
        </Grid>
      </StyledTableCell> */}
      <StyledTableCell width={"5%"} align="center">
        Feature
      </StyledTableCell>
      <StyledTableCell width={"5%"} align="center">
        Action
      </StyledTableCell>
      <StyledTableCell width={"5%"} align="center">
        Expand
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default function MetaTable(props: any) {
  const [user, setUser] = React.useState<CurrentUser>();
  useEffect(() => {
    const user = getUser();
    setUser(user);
    // handleWorkspaceList(user);
  }, []);
  return (
    <div style={{ marginTop: "2%", width: "99%" }}>
      <PaginatedTable
        renderRow={(row, refresh) => renderRow(row, refresh)}
        update={props.refresh}
        renderHeader={RenderHeader}
        fetchHandler={(pageNo, pageSize) => {
          if (user) {
            return getTable(user, pageNo, pageSize).then((res) => res);
          } else {
            return Promise.resolve(undefined); // Return an empty promise for the falsy case
          }
        }}
      />
    </div>
  );
}
