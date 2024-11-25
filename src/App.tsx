import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import CalendarPages from "./pages/CalendarPages";
import StatisticPage from "./pages/StatisticPage";
import PomodoroPages from "./pages/PomodoroPages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/calendar" element={<CalendarPages />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/pomodoro" element={<PomodoroPages />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
