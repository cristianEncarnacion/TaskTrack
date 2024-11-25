import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { supabase } from "../backend/Database";
import { useAuth } from "../context/AuthContext";
type TimeState = {
  Segundos: number;
  Minutos: number;
};

const PomodoroPages = () => {
  const [time, setTime] = useState<TimeState>(
    JSON.parse(
      localStorage.getItem("pomodoroTime") || '{"Segundos": 0, "Minutos": 25}'
    )
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(
    JSON.parse(localStorage.getItem("isPomodoro") || "true")
  );
  const [selectedTask, setSelectedTask] = useState(
    JSON.parse(localStorage.getItem("selectedTask") || "null")
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tasks, setTasks] = useState<any>([]);
  const { user } = useAuth();
  useEffect(() => {
    localStorage.setItem("pomodoroTime", JSON.stringify(time));
    localStorage.setItem("isPomodoro", JSON.stringify(isPomodoro));
    localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
  }, [time, isPomodoro, selectedTask]);

  useEffect(() => {
    audioRef.current = new Audio("/audio/timbre.mp3");
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error reproduciendo el audio:", error);
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      let { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("complete", "FALSE")
        .eq("user_id", user.id);
      setTasks(data || []);
    };

    fetchTasks();
  }, [user]);

  const decrementTime = () => {
    setTime(({ Segundos, Minutos }) => {
      if (Segundos === 0) {
        if (Minutos === 0) {
          stopCronometro();
          playAudio();
          return isPomodoro
            ? { Segundos: 0, Minutos: 25 }
            : { Segundos: 0, Minutos: 5 };
        }
        return { Segundos: 59, Minutos: Minutos - 1 };
      }
      return { Segundos: Segundos - 1, Minutos };
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(decrementTime, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startCronometro = () => setIsRunning(true);
  const stopCronometro = () => setIsRunning(false);
  const resetCronometro = () => {
    stopCronometro();
    setTime(
      isPomodoro ? { Segundos: 0, Minutos: 25 } : { Segundos: 0, Minutos: 5 }
    );
  };

  const switchToPomodoro = () => {
    stopCronometro();
    setIsPomodoro(true);
    setTime({ Segundos: 0, Minutos: 25 });
  };

  const switchToBreak = () => {
    stopCronometro();
    setIsPomodoro(false);
    setTime({ Segundos: 0, Minutos: 5 });
  };

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task);
  };

  return (
    <Layout>
      <section className="  bg-white p-8 flex flex-col items-center shadow-md rounded-lg">
        <section className="mb-8 w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Elige una tarea
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {tasks.length === 0 && (
              <p className="text-center text-gray-500">No hay tareas</p>
            )}
            {tasks.map((task: any) => (
              <button
                key={task.id}
                className={`px-4 py-2 rounded border ${
                  selectedTask?.id === task.id
                    ? "bg-blue-700 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handleTaskSelect(task)}
              >
                {task.task}
              </button>
            ))}
          </div>
        </section>

        <section className="flex gap-x-2 mb-6">
          <button
            className={`border p-2 rounded ${
              isPomodoro ? "bg-blue-700 text-white" : "bg-gray-300"
            }`}
            onClick={switchToPomodoro}
            disabled={isRunning}
          >
            Pomodoro
          </button>
          <button
            className={`border p-2 rounded ${
              !isPomodoro ? "bg-yellow-700 text-white" : "bg-gray-300"
            }`}
            onClick={switchToBreak}
            disabled={isRunning}
          >
            Descanso
          </button>
        </section>

        <div className="text-4xl font-bold mb-6">
          {time.Minutos.toString().padStart(2, "0")}:
          {time.Segundos.toString().padStart(2, "0")}
        </div>

        <div className="flex gap-x-4">
          <button
            className={`px-4 py-2 bg-green-500 text-white rounded ${
              isRunning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={startCronometro}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className={`px-4 py-2 bg-red-500 text-white rounded ${
              isRunning ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={stopCronometro}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={resetCronometro}
          >
            Reset
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default PomodoroPages;
