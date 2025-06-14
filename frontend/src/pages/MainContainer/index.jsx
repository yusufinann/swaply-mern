import {Box} from "@mui/material"; 
import { Outlet } from "react-router-dom";

function MainContainer() {
  
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', width: '100%' }}>
      <Outlet />
    </Box>
  );
}

export default MainContainer;