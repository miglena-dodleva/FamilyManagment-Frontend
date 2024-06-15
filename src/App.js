import "./App.css";
import Home from "./components/home/Home";
//import ResponsiveAppBar from "./components/test";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Navigation from "./components/navigation/Navigation";
import ToDoListIndex from "./components/toDoList/ToDoListIndex";
import FamilyIndex from "./components/family/FamilyIndex.js";

// import Footer from "./components/footer/Footer";
//import ResponsiveDashboard from "./components/testDashboard";

import { Routes, Route } from "react-router-dom";
// import Users from "./components/users/Users";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CalendarIndex from "./components/calendar/CalendarIndex.js";
import TaskIndex from "./components/task/TaskIndex.js";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navigation />
        <Routes>
          {
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/toDoLists" element={<ToDoListIndex />}></Route>
              <Route path="/families" element={<FamilyIndex />}></Route>
              <Route path="/calendars" element={<CalendarIndex />}></Route>
              <Route path="/ToDoList/:id/tasks" element={<TaskIndex />} />
            </>
            /*<Route path="/" element={<ResponsiveAppBar />}></Route>
                    <Route path="/" element={<ResponsiveDashboard />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/login" element={<Login />}></Route> */
          }
        </Routes>
        {/* <Footer /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
