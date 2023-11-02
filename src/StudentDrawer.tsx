import {  useState } from "react";
import {
  Box,
  Container,
  Divider,
  Drawer,
  TextField,
  Typography,
  Checkbox
} from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { IStudentDetail } from "./type";

type StudentProps = {
  studentDrawerData: IStudentDetail;
  studentDrawerOpen: boolean;

  onStudentDrawerClose: () => void;
  isViewDrawer: boolean;
  onSaveSuccess: () => void;
};

function StudentDrawer({
  studentDrawerData,
  studentDrawerOpen,
  onStudentDrawerClose,
  onSaveSuccess,
  isViewDrawer,
}: StudentProps) {
  const [studentDetail, setStudentDetail] =
    useState<IStudentDetail>(studentDrawerData);

  const handleStudentDrawerCloseClick = () => {
    onStudentDrawerClose();
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
                width: "300px",
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
                    handleDrawerSave();
                  }}
                >
                  <TextField
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
                  {studentDetail.courses &&
                    studentDetail.courses.map((coursedata, index) => (
                      <div key={index}>
                        <label>
                          <Checkbox
                           
                            onChange={() =>
                              handleCourseCheckboxChange(courseData)
                            }
                          />
                          {coursedata.title}
                        </label>
                      </div>
                    ))}

                  {!isViewDrawer && (
                    <Box position={"absolute"} bottom={0} right={0} padding={3}>
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
                        // onClick={handleCancel}
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

export default StudentDrawer;
