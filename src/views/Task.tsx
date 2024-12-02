import React, { useState, useEffect } from "react";
import { Tasks } from "../types/Task";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../backend/Database";
import { IoAddCircleOutline } from "react-icons/io5";

const Task = () => {
  const { user, checkUser } = useAuth();
  const [value, setValue] = useState<Tasks>({
    id: 1,
    task: "",
    date: new Date().toISOString().split("T")[0],
    complete: false,
    rango: 1,
    RangeStatus: "P1",
    SelectedColor: "bg-blue-500",
  });
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [SelectedColor, setSelectedColor] = useState<string>("bg-blue-500");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    checkUser();
  }, []);

  const fetchTasks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      setTasks(data);
    }
  };
  fetchTasks();

  const handleEditTask = async () => {
    if (!value.task) {
      alert("Debes agregar una tarea");
      return;
    }
    try {
      const updateTask = { ...value, SelectedColor };

      const { error } = await supabase
        .from("tasks")
        .update({
          task: updateTask.task,
          rango: updateTask.rango,
          SelectedColor: updateTask.SelectedColor,
          RangeStatus: updateTask.RangeStatus,
          complete: updateTask.complete,
          date: updateTask.date,
        })
        .eq("id", value.id);

      if (error) {
        console.error(error);
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === value.id ? { ...t, ...updateTask } : t))
      );

      setValue({
        task: "",
        id: 0,
        date: new Date().toISOString().split("T")[0],
        complete: false,
        rango: 1,
        RangeStatus: "P1",
        SelectedColor: "bg-blue-500",
      });
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) {
        console.error(error);
        return;
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.task) {
      alert("Debes agregar una tarea");
      return;
    }

    if (edit) {
      await handleEditTask();
    } else {
      try {
        const newTask = { ...value, SelectedColor };

        const { data, error } = await supabase
          .from("tasks")
          .insert([
            {
              task: newTask.task,
              complete: newTask.complete,
              rango: newTask.rango,
              RangeStatus: newTask.RangeStatus,
              date: newTask.date,
              SelectedColor: newTask.SelectedColor,
              user_id: user?.id,
            },
          ])
          .eq("id", user?.id);

        if (error) {
          console.error(error);
          return;
        }

        if (data) {
          setTasks((prevTasks) => [...prevTasks, ...data]);
        }
        setTasks((prevTasks) => [...prevTasks, newTask]);

        setValue({
          task: "",
          id: 0,
          date: new Date().toISOString().split("T")[0],
          complete: false,
          rango: 1,
          RangeStatus: "P1",
          SelectedColor: "bg-blue-500",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setValue(task);
      setEdit(true);
    }
  };
  const colorOptions = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const handleFilterChange = (filterType: "all" | "completed" | "pending") => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.complete;
    if (filter === "pending") return !task.complete;
    return true;
  });

  const handleCheckbox = async (task: Tasks) => {
    try {
      const updatedComplete = !task.complete;

      const { error } = await supabase
        .from("tasks")
        .update({ complete: updatedComplete })
        .eq("id", task.id);

      if (error) {
        console.error("Error al actualizar la tarea:", error);
        return;
      }

      setTasks((prevTask) =>
        prevTask.map((t) =>
          t.id === task.id ? { ...t, complete: updatedComplete } : t
        )
      );
    } catch (error) {
      console.error("Error en handleCheckbox:", error);
    }
  };

  const inputRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRange = e.target.valueAsNumber;
    setValue((prev) => ({
      ...prev,
      rango: newRange,
      RangeStatus:
        newRange === 1
          ? "P1"
          : newRange === 2
          ? "P2"
          : newRange === 3
          ? "P3"
          : "P0",
    }));
  };

  return (
    <section className=" w-full md:w-[60%] border flex flex-col p-4">
      <h2 className="text-2xl">Tareas</h2>
      <h5 className="text-gray-500 mb-4">
        Gestiona tus tareas diarias con estilo
      </h5>
      <form onSubmit={handleClick} className="w-full  mb-5">
        <div className="flex gap-y-2 flex-col md:flex-row justify-center items-center md:gap-x-2">
          <input
            type="text"
            placeholder="Nueva tarea..."
            name="task"
            value={value.task}
            onChange={onChange}
            className=" md:w-[70%]
          border rounded-md p-2"
          />
          <input
            type="date"
            className="md:w-[30%] border rounded-md p-2"
            value={value.date}
            onChange={onChange}
            name="date"
          />
        </div>

        <div className=" mt-2 flex flex-col gap-y-4 md:flex-row gap-x-2 items-center  max-w-full">
          <div className="flex gap-x-1 items-center max-w-full">
            {colorOptions.map((color, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full ${color} ${
                    SelectedColor === color
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }
               
                `}
                  aria-label={`Seleccionar color ${color}`}
                ></div>
              );
            })}
          </div>
          <div className="flex  flex-col md:gap-y-2  md:flex-row items-center max-w-full">
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 w-full">
              <input
                type="range"
                name=""
                id=""
                value={value.rango}
                onChange={inputRange}
                min={0}
                max={3}
                className="w-full"
              />
              <span className="text-center">Prioridad: {value.rango}</span>
            </div>
            <button className=" flex   ml-1  items-center gap-x-2 hover:opacity-[0.8] hover:scale-95 transition-all duration-[0.3s] bg-black text-white px-4 py-2 rounded-md">
              <IoAddCircleOutline />
              {edit ? "Editar" : "Agregar"}
            </button>
          </div>
        </div>
      </form>

      <section className="w-full bg-slate-200 p-2">
        <div>
          <div className="flex flex-col md:flex-row mb-4">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-2 py-1 ${
                filter === "all" ? "bg-white" : ""
              } transition-all duration-[0.7s] `}
            >
              Todas
            </button>
            <button
              onClick={() => handleFilterChange("pending")}
              className={`px-2 py-1 ${
                filter === "pending" ? "bg-white" : ""
              } transition-all duration-[0.7s]`}
            >
              Pendientes
            </button>
            <button
              onClick={() => handleFilterChange("completed")}
              className={`px-2 py-1 ${
                filter === "completed" ? "bg-white" : ""
              } transition-all duration-[0.7s]`}
            >
              Completadas
            </button>
          </div>

          {filteredTasks.length <= 0 ? (
            <span>No hay tareas</span>
          ) : (
            <div className="max-w-full  overflow-auto max-h-[350px]">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`transition-task w-full flex flex-col md:flex-row justify-between items-center gap-y-2 md:gap-x-2 p-2 rounded-md mt-2 ${task.SelectedColor}`}
                  style={{ maxWidth: "100%", wordWrap: "break-word" }}
                >
                  <div className="flex items-center gap-x-2 w-full">
                    <p className="truncate w-full">
                      {task.task.length > 30
                        ? task.task.slice(0, 30) + "..."
                        : task.task}
                    </p>
                    <span className="hidden md:block">{task.RangeStatus}</span>
                  </div>
                  <div className="flex gap-x-2 ml-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="text-white bg-blue-500 px-2 py-1 rounded-md"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-white bg-red-500 px-2 py-1 rounded-md"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleCheckbox(task)}
                      title="Marcar como completado"
                      className="bg-black text-white px-2 py-1 rounded-md"
                    >
                      {task.complete ? "✅" : "❌"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Task;
