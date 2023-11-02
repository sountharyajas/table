import { Routes } from "react-router";

import { Route } from "react-router";
import { Link } from "react-router-dom"; 

import StudentTable from "./StudentTable";
import CourseTable from "./CourseTable";

function Navbar() {
  return (
    <>
      <div>
        <button>
          <Link to="studenttable">studenttable</Link>
        </button>

        <br />
        <br />
        <button>
          <Link to="coursetable">coursetable</Link>
        </button>

        <Routes>
          <Route path="/studenttable" element={<StudentTable />} />
          <Route path="/coursetable" element={<CourseTable />} />
        </Routes>
      </div>
    </>
  );
}

export default Navbar;
