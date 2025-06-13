import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
function MainContainer() {
  return (
   <Box component="main" sx={{ flexGrow: 1}}> 
      <Outlet />
    </Box>
  );
}

export default MainContainer;
