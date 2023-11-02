import { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import { IcourseDetail } from "./type";
import Button from "@mui/material/Button";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
interface CourseProps {
  courseDrawerData: IcourseDetail;
  courseDrawerOpen: boolean;
  onCourseDrawerClose: () => void;
  isViewCourseDrawer: boolean;
  onSaveCourseSuccess: () => void;
}

function CourseDrawer({
  courseDrawerData,
  courseDrawerOpen,
  onCourseDrawerClose,
  isViewCourseDrawer,
  onSaveCourseSuccess,
}: CourseProps) {
  const [courseDetail, setCourseDetail] =
    useState<IcourseDetail>(courseDrawerData);

  const handleCourseDrawerCloseClick = () => {
    onCourseDrawerClose();
  };

  const handleCourseDrawerSave = async () => {
    if (courseDetail._id) {
      await axios
        .put(
          `http://localhost:3000/updateCourse/${courseDetail._id}`,
          courseDetail
        )
        .then(() => {
          onSaveCourseSuccess();
        });
    } else {
      await axios
        .post("http://localhost:3000/createCourse", courseDetail)
        .then(() => {
          onSaveCourseSuccess();
        });
    }
    onCourseDrawerClose();
  };

  return (
    <>
      <Box>
        {courseDrawerData && (
          <Drawer
            sx={{ position: "relative" }}
            anchor="right"
            open={courseDrawerOpen}
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
                {courseDetail._id != "" ? " Data" : "Add Data"}
              </Typography>
              <Box onClick={handleCourseDrawerCloseClick}>
                <CloseIcon />
              </Box>
            </Box>
            <Divider />
            <Container>
              <Box py={3}>
                <form>
                  <TextField
                    fullWidth
                    label="title"
                    name="title"
                    value={courseDetail.title}
                    style={{ marginBottom: "10px" }}
                    onChange={(e) =>
                      setCourseDetail({
                        ...courseDetail,
                        title: e.target.value,
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    label="description"
                    name="description"
                    value={courseDetail.description}
                    style={{ marginBottom: "10px" }}
                    onChange={(e) =>
                      setCourseDetail({
                        ...courseDetail,
                        description: e.target.value,
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    label="fees"
                    name="fees"
                    value={courseDetail.fees}
                    style={{ marginBottom: "10px" }}
                    onChange={(e) =>
                      setCourseDetail({
                        ...courseDetail,
                        fees: e.target.value,
                      })
                    }
                  />
                  {!isViewCourseDrawer && (
                    <Box position={"absolute"} bottom={0} right={0} padding={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={handleCourseDrawerSave}
                        style={{ margin: "10px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={handleCourseDrawerCloseClick}
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

export default CourseDrawer;
