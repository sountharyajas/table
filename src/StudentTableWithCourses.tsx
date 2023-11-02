import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Container,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import EditIcon from "@mui/icons-material/Edit";
import { IStudentDetail, IcourseDetail } from "./type";
import DeleteIcon from "@mui/icons-material/Delete";
import StudentChecboxDrawer from "./StudentCheckboxDrawer";
const initialValue: IStudentDetail = {
  _id: "",
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  age: "",
  courses: [],
};

function StudentTableWithCourses() {
  const [studentsDetails, setStudentsDetails] = useState<IStudentDetail[]>();
  const [masterCourses, setMasterCourses] = useState<IcourseDetail[]>();
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<IStudentDetail | null>();
  const [studentDrawerData, setStudentDrawerData] =
    useState<IStudentDetail>(initialValue);
  const [studentDrawerOpen, setStudentDrawerOpen] = useState(false);
  const [isViewDrawer, setIsViewDrawer] = useState(true);
  const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
    useState(false);
  const handleViewClick = (item: IStudentDetail) => {
    setStudentDrawerData(item);
    setStudentDrawerOpen(true);
    setIsViewDrawer(true);
  };

  const handleStudentEditClick = (item: IStudentDetail) => {
    setStudentDrawerData(item);
    setStudentDrawerOpen(true);
    setIsViewDrawer(false);
  };

  const handleStudentAddClick = () => {
    setStudentDrawerData(initialValue);
    setStudentDrawerOpen(true);
    setIsViewDrawer(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogConfirmationOpen(false);
  };

  const handleStudentDeleteClick = (item: IStudentDetail) => {
    setDeleteConfirmation(item);
    setDeleteDialogConfirmationOpen(true);
  };

  const handleStudentDeleteClickConfirm = async () => {
    await axios
      .delete<IStudentDetail[]>(
        `http://localhost:3000/deleteStudent/${deleteConfirmation?._id}`
      )
      .then(() => {
        getAllStudents();
      });
    setDeleteConfirmation(null);
    setDeleteDialogConfirmationOpen(false);
  };
  const getAllCourses = async () => {
    const response = await axios.get("http://localhost:3000/getAllCourses");
    setMasterCourses(response.data);
  };

  const getAllStudents = async () => {
    const response = await axios.get<IStudentDetail[]>(
      "http://localhost:3000/getAllStudents"
    );

    setStudentsDetails(response.data);
  };

  useEffect(() => {
    getAllStudents();
    getAllCourses();
  }, []);

  return (
    <>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4">student list</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStudentAddClick}
          >
            Add student
          </Button>
        </Box>
      </Container>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">phoneNumber</TableCell>
                <TableCell align="center">gender</TableCell>
                <TableCell align="center">age</TableCell>
                <TableCell align="center">courses</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsDetails?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center" component="th">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.email}</TableCell>

                  <TableCell align="center">{item.phoneNumber}</TableCell>
                  <TableCell align="center">{item.gender}</TableCell>
                  <TableCell align="center">{item.age}</TableCell>
                  <TableCell align="center">
                    {item.courses &&
                      item.courses.map((id, index) => (
                        <p key={index}>
                          {
                            masterCourses?.find(
                              (mastercourse) => mastercourse._id == id
                            )?.title
                          }
                        </p>
                      ))}
                  </TableCell>

                  <TableCell>
                    <Tooltip title="view">
                      <IconButton>
                        <RemoveRedEyeIcon
                          fontSize="large"
                          onClick={() => handleViewClick(item)}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton>
                        <EditIcon
                          fontSize="large"
                          onClick={() => handleStudentEditClick(item)}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon
                          fontSize="large"
                          onClick={() => handleStudentDeleteClick(item)}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog
        open={deleteDialogConfirmationOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure do you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteCancel}>
            Disagree
          </Button>
          <Button onClick={handleStudentDeleteClickConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {studentDrawerOpen && (
        <StudentChecboxDrawer
          studentDrawerData={studentDrawerData}
          studentDrawerOpen={studentDrawerOpen}
          onStudentDrawerClose={() => setStudentDrawerOpen(false)}
          onSaveSuccess={() => {
            setStudentDrawerOpen(false);
            getAllStudents();
          }}
          masterCourses={masterCourses ?? []}
          isViewDrawer={isViewDrawer}
        />
      )}
    </>
  );
}

export default StudentTableWithCourses;
