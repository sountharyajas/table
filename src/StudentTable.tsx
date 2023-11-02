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
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StudentDrawer from "./StudentDrawer";
import EditIcon from "@mui/icons-material/Edit";
import { IStudentDetail } from "./type";
import DeleteIcon from "@mui/icons-material/Delete";
const initialValue: IStudentDetail = {
  _id: "",
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  age: "",
};

function StudentTable() {
  const [studentsDetails, setStudentsDetails] = useState<IStudentDetail[]>();
  const [studentDrawerData, setStudentDrawerData] =
    useState<IStudentDetail>(initialValue);
  const [studentDrawerOpen, setStudentDrawerOpen] = useState(false);
  const [isViewDrawer, setIsViewDrawer] = useState(true);

useEffect(() => {
  getAllStudents();
}, []);

  const handleViewClick = (item: IStudentDetail) => {
    setStudentDrawerData(item);
    setStudentDrawerOpen(true);
  };

  const handleStudentEditClick = (item: IStudentDetail) => {
    setStudentDrawerData(item);
    setStudentDrawerOpen(true);
    setIsViewDrawer(false);
  };

  const handleStudentAddClick = () => {
    setStudentDrawerData(initialValue);
    setStudentDrawerOpen(true);
  };

  const handleStudentDeleteClick = async (item: IStudentDetail) => {
    await axios
      .delete<IStudentDetail[]>(
        ` http://localhost:3000/deleteStudent/${item._id}`
      )
      .then(() => {
        getAllStudents();
      });
  };

  const getAllStudents = async () => {
    const response = await axios.get<IStudentDetail[]>(
      "http://localhost:3000/getAllStudents"
    );

    setStudentsDetails(response.data);
  };

  

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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">phoneNumber</TableCell>
                <TableCell align="center">gender</TableCell>
                <TableCell align="center">age</TableCell>
                <TableCell>view</TableCell>
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
                  <TableCell>
                    <Box onClick={() => handleViewClick(item)}>
                      <RemoveRedEyeIcon fontSize="large" />
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box onClick={() => handleStudentEditClick(item)}>
                      <EditIcon fontSize="large" />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box onClick={() => handleStudentDeleteClick(item)}>
                      <DeleteIcon fontSize="large" />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {studentDrawerOpen && (
        <StudentDrawer
          studentDrawerData={studentDrawerData}
          studentDrawerOpen={studentDrawerOpen}
          onStudentDrawerClose={() => setStudentDrawerOpen(false)}
          onSaveSuccess={() => {
            setStudentDrawerOpen(false);
            getAllStudents();
          }}
          isViewDrawer={isViewDrawer}
        />
      )}
    </>
  );
}

export default StudentTable;
