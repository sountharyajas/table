import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

function NavigatePage() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Button>
            <Link
              style={{
                color: "white",
              }}
              to="/studenttablewithcourses"
            >
              studenttable
            </Link>
          </Button>
          <Button>
            <Link
              style={{
                color: "white",
              }}
              to="/coursetable"
            >
              coursetable
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavigatePage;
