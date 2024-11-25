import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const localizer = dayjsLocalizer(dayjs);

const CalendarPages = () => {
  const { user, fetchTasks, tasks, checkUser } = useAuth();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user]);

  const events =
    tasks?.map((task: any) => ({
      title: task.task,
      start: dayjs(task.date).toDate(), // Conversión segura usando dayjs
      end: dayjs(task.date).toDate(), // Lo mismo para la fecha final
    })) || [];

  return (
    <Layout>
      <BigCalendar
        events={events}
        localizer={localizer}
        style={{ height: "100vh" }}
      />
    </Layout>
  );
};

export default CalendarPages;
