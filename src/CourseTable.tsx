import { useEffect, useState } from "react";

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
  Typography,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CourseDrawer from "./CourseDrawer";
import { IcourseDetail } from "./type";
import DeleteIcon from "@mui/icons-material/Delete";
const initialCourseValue: IcourseDetail = {
  _id: "",
  title: "",
  description: "",
  fees: "",
};

function CourseTable() {
  const [CourseDetails, setCourseDetails] = useState<IcourseDetail[]>();
  const [courseDrawerData, setCourseDrawerData] =
    useState<IcourseDetail>(initialCourseValue);
  const [courseDrawerOpen, setCourseDrawerOpen] = useState(false);
 const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
   useState(false);
  const [isViewCourseDrawer, setISviewCourseDreawer] = useState(true);
 const [deleteConfirmation, setDeleteConfirmation] =
   useState<IcourseDetail | null>();
  useEffect(() => {
    getAllCourse();
  }, []);

  const handleViewClick = (item: IcourseDetail) => {
    setCourseDrawerData(item);
    setCourseDrawerOpen(true);
    setISviewCourseDreawer(true);
  };

  const handleCourseEditClick = (item: IcourseDetail) => {
    setCourseDrawerData(item);
    setCourseDrawerOpen(true);
    setISviewCourseDreawer(false);
  };
   const handleDeleteCancel = () => {
     setDeleteDialogConfirmationOpen(false);
   };


  const handleCourseAddClick = () => {
    setCourseDrawerData(initialCourseValue);
    setCourseDrawerOpen(true);
    setISviewCourseDreawer(false);
  };

  const handleCourseDeleteClick = (item:IcourseDetail) => {
  
    setDeleteConfirmation(item);
     setDeleteDialogConfirmationOpen(true);
}


  const handleCourseDeleteClickConfirm = async () => {
    await axios
      .delete<IcourseDetail[]>(
        `http://localhost:3000/deleteCourse/${deleteConfirmation?._id}`
      )
      .then(() => {
        getAllCourse();
      });
     setDeleteConfirmation(null);
     setDeleteDialogConfirmationOpen(false);
  };

  const getAllCourse = async () => {
    const response = await axios.get<IcourseDetail[]>(
      "http://localhost:3000/getAllCourses"
    );
    setCourseDetails(response.data);
  };

  return (
    <>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4">course list</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCourseAddClick}
          >
            Add course
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">title</TableCell>
                <TableCell align="center">description</TableCell>
                <TableCell align="center">fees</TableCell>
                <TableCell>view</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CourseDetails?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center" component="th">
                    {item.title}
                  </TableCell>
                  <TableCell align="center">{item.description}</TableCell>

                  <TableCell align="center">{item.fees}</TableCell>
                  <TableCell>
                    <Box onClick={() => handleViewClick(item)}>
                      <RemoveRedEyeIcon fontSize="large" />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box onClick={() => handleCourseEditClick(item)}>
                      <EditIcon fontSize="large" />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box onClick={() => handleCourseDeleteClick(item)}>
                      <DeleteIcon fontSize="large" />
                    </Box>
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
          <Button onClick={handleCourseDeleteClickConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {courseDrawerOpen && (
        <CourseDrawer
          courseDrawerData={courseDrawerData}
          courseDrawerOpen={courseDrawerOpen}
          onCourseDrawerClose={() => setCourseDrawerOpen(false)}
          onSaveCourseSuccess={() => {
            setCourseDrawerOpen(false);
            getAllCourse();
          }}
          isViewCourseDrawer={isViewCourseDrawer}
        />
      )}
    </>
  );
}

export default CourseTable;
