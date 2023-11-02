import { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Drawer,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { IStudentDetail, IcourseDetail } from "./type";

type Props = {
  studentDrawerData: IStudentDetail;
  studentDrawerOpen: boolean;
  masterCourses: IcourseDetail[];
  onStudentDrawerClose: () => void;
  isViewDrawer: boolean;
  onSaveSuccess: () => void;
};

function StudentChecboxDrawer({
  studentDrawerData,
  studentDrawerOpen,
  onStudentDrawerClose,
  onSaveSuccess,
  isViewDrawer,
  masterCourses,
}: Props) {
  const [studentDetail, setStudentDetail] =
    useState<IStudentDetail>(studentDrawerData);

  const handleStudentDrawerCloseClick = () => {
    onStudentDrawerClose();
  };

  const handleCancel = () => onStudentDrawerClose();

  const handleCourseCheckboxChange = (courseId: string) => {
    {
      setStudentDetail({
        ...studentDetail,
        courses: [...studentDetail.courses, courseId],
      });
    }
  };
  const handleDrawerSave = async () => {
    if (studentDetail._id) {
      await axios
        .put<IStudentDetail>(
          `http://localhost:3000/updateStudent/${studentDetail._id}`,
          studentDetail
        )
        .then(() => {
          onSaveSuccess();
        });
    } else {
      await axios
        .post<IStudentDetail>(
          "http://localhost:3000/createStudent",
          studentDetail
        )
        .then(() => {
          onSaveSuccess();
        });
    }
  };

  return (
    <>
      <Box>
        {studentDetail && (
          <Drawer
            sx={{ position: "relative" }}
            anchor="right"
            open={studentDrawerOpen}
            PaperProps={{
              sx: {
                width: "400px",
                height: "100%",
              },
            }}
          >
            <Box
              padding={2}
              color={"purple"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography variant="h5">
                {studentDetail._id != "" ? " Data" : "Add Data"}
              </Typography>
              <Box onClick={handleStudentDrawerCloseClick}>
                <CloseIcon />
              </Box>
            </Box>
            <Divider />
            <Container>
              <Box py={3}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TextField
                    fullWidth
                    label="name"
                    name="name"
                    value={studentDetail.name}
                    onChange={(e) =>
                      setStudentDetail({
                        ...studentDetail,
                        name: e.target.value,
                      })
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="email"
                    name="email"
                    value={studentDetail.email}
                    onChange={(e) =>
                      setStudentDetail({
                        ...studentDetail,
                        email: e.target.value,
                      })
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="phoneNumber"
                    name="phoneNumber"
                    value={studentDetail.phoneNumber}
                    onChange={(e) =>
                      setStudentDetail({
                        ...studentDetail,
                        phoneNumber: e.target.value,
                      })
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="gender"
                    name="gender"
                    value={studentDetail.gender}
                    onChange={(e) =>
                      setStudentDetail({
                        ...studentDetail,
                        gender: e.target.value,
                      })
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="age"
                    name="age"
                    value={studentDetail.age}
                    onChange={(e) =>
                      setStudentDetail({
                        ...studentDetail,
                        age: e.target.value,
                      })
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <Typography variant="h6">Courses</Typography>
                  {masterCourses &&
                    masterCourses.map((mastercoursedata) => (
                      <div key={mastercoursedata._id}>
                        <Checkbox
                          checked={studentDetail.courses.includes(
                            mastercoursedata._id
                          )}
                          onChange={() =>
                            handleCourseCheckboxChange(mastercoursedata._id)
                          }
                        />

                        {mastercoursedata.title}
                      </div>
                    ))}

                  {!isViewDrawer && (
                    <Box position={"absolute"} bottom={0} right={0} padding={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={handleDrawerSave}
                        style={{ margin: "10px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={handleCancel}
                      >
                        cancel

                        
                      </Button>
                    </Box>
                  )}
                </form>
              </Box>
            </Container>
          </Drawer>
        )}
      </Box>
    </>
  );
}

export default StudentChecboxDrawer;
