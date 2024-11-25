import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { supabase } from "../backend/Database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Tasks } from "../types/Task";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const { user, checkUser } = useAuth();
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const fetchTasks = async () => {
    if (!user) {
      return;
    }

    let { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    const formattedTasks = data?.map((task: Tasks) => ({
      ...task,
      date: dayjs(task.date).toDate(),
    }));

    setTasks(formattedTasks);
  };

  fetchTasks();
  const events = tasks.map((task: any) => ({
    title: task.task,
    start: task.date,
    end: task.date,
  }));

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        style={{ height: 500 }}
        views={["month"]}
      />
    </div>
  );
};

export default MyCalendar;
