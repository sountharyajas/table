import { Route, Routes } from "react-router-dom";

import { Box } from "@mui/material";

import LayOutComponent from "./LayOutComponent";
import StudentTableWithCourses from "./StudentTableWithCourses";
import CourseTable from "./CourseTable";

function App() {
  // const person = {
  //   first: "praveen",
  //   last: "magician",
  // };
  // const lotOfPersons = [
  //   {
  //     first: "riya",
  //     last: "jas",
  //   },
  //   {
  //     first: "surya",
  //     last: "roy",
  //   },
  //   {
  //     first: "nikki",
  //     last: "vinoth",
  //   },
  // ];

  // function printAddress(arg: GreetProps) {
  //   console.log(arg);
  // }
  // var details = {
  //   email: "riya@gmail.com",
  //   age: 34,
  //   name: "ufsdjfg",
  // } as GreetProps;

  // var name = "riya";
  // printAddress(details);

  return (
    <>
      <Box padding={6}>
        <Routes>
          <Route path="/" element={<LayOutComponent />}>
            <Route
              path="/studenttablewithcourses"
              element={<StudentTableWithCourses />}
            />
            <Route path="/coursetable" element={<CourseTable />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
