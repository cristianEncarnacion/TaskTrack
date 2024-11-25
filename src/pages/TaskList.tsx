import MyCalendar from "../components/Calendar";

import "../App.css";
import Task from "../views/Task";

import Layout from "../components/Layout";

const TaskList = () => {
  return (
    <Layout>
      <h1 className="text-center md:text-left  text-3xl mb-4 ">
        Gestor de Tareas
      </h1>
      <section className=" flex flex-col md:flex-row gap-y-4  md:gap-x-2 p-6 bg-white border rounded-xl w-full shadow-md  ">
        <Task />

        <p className=" md:hidden text-sm text-gray-500 mb-4 text-center">
          Visualiza tus tareas en el calendario
        </p>
        <section className="hidden  w-full md:w-[40%] border md:flex md:flex-col p-2 md:p-4">
          <h2>Calendario</h2>
          <p className=" text-sm text-gray-500 mb-4">
            Visualiza tus tareas en el calendario
          </p>
          <MyCalendar />
        </section>
      </section>
    </Layout>
  );
};

export default TaskList;
