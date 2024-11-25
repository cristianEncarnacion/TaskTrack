import { IoHomeSharp } from "react-icons/io5";
import { CiCalendar, CiClock1, CiLogout } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="fixed top-4 left-4 z-50 bg-[rgb(1,28,63)] text-white p-2 rounded-md md:hidden"
      >
        {modal ? <IoIosClose size={24} /> : <IoIosMenu size={24} />}
      </button>

      <aside
        className="hidden md:flex bg-[rgb(1,28,63)] text-white flex-col p-4 items-center justify-between text-xl h-full"
        style={{ gridArea: "sidebar" }}
      >
        <ul className="flex flex-col gap-y-6 mt-10">
          <li className="p-2 list-none mb-2">
            <a
              href="/tasks"
              className="no-underline text-white gap-x-1 flex items-center"
            >
              <IoHomeSharp />
              Tareas
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/calendar"
              className="no-underline text-white flex gap-x-1 items-center"
            >
              <CiCalendar />
              Calendario
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/statistic"
              className="gap-x-1 no-underline text-white flex items-center"
            >
              <FcStatistics />
              Estadísticas
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/pomodoro"
              className="gap-x-1 no-underline   text-white flex items-center"
            >
              <CiClock1 />
              Pomodoro
            </a>
          </li>
        </ul>
        <button
          onClick={logout}
          className="gap-x-1 bg-none border-none text-white flex items-center text-xl cursor-pointer w-full p-3 hover:bg-[#444] duration-[0.3s] transition-all"
        >
          <CiLogout />
          Salir
        </button>
      </aside>

      {modal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleModal}
          ></div>

          <div className="relative bg-[rgb(1,28,63)] text-white w-[300px] p-4 rounded-lg shadow-lg">
            <ul className="flex flex-col justify-center items-center gap-y-6 mt-4">
              <li>
                <a
                  href="/tasks"
                  className="no-underline text-white flex gap-x-2 items-center"
                >
                  <IoHomeSharp />
                  Tareas
                </a>
              </li>
              <li>
                <a
                  href="/calendar"
                  className="no-underline text-white flex gap-x-2 items-center"
                >
                  <CiCalendar />
                  Calendario
                </a>
              </li>
              <li>
                <a
                  href="/statistic"
                  className="no-underline text-white flex gap-x-2 items-center"
                >
                  <FcStatistics />
                  Estadísticas
                </a>
              </li>
              <li>
                <a
                  href="/pomodoro"
                  className="no-underline text-white flex gap-x-2 items-center"
                >
                  <CiClock1 />
                  Pomodoro
                </a>
              </li>
            </ul>
            <button
              onClick={logout}
              className=" flex  justify-center items-center  gap-x-2 mt-6 w-full bg-[#444] p-2 rounded text-white  transition"
            >
              <CiLogout />
              Salir
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
