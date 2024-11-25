import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import BasicPie from "../components/graphics/BasicPie";
import { supabase } from "../backend/Database";
import { useAuth } from "../context/AuthContext";
import { FaTasks } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import BasicGauge from "../components/graphics/BasicGauge";

const StatisticPage = () => {
  const { user, setUser } = useAuth();
  const [tasksToDo, setTasksToDo] = useState<number>(0);
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          ...session.user,
          email: session.user.email || "",
        });
      }
    };
    checkUser();
  }, [setUser]);

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      const { data: toDoData } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .eq("complete", false);

      const { data: completedData } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .eq("complete", true);

      setTasksToDo(toDoData?.length || 0);
      setTasksCompleted(completedData?.length || 0);
    };

    fetchTasks();
  }, [user]);

  return (
    <Layout>
      <section className="flex flex-col md:flex-row gap-y-2 justify-center items-center md:gap-x-10 md:m-3">
        <div className="bg-yellow-500 rounded-md p-2 flex">
          <FaTasks className="md:h-[40px] md:w-[40px] h-[30px] w-[30px]" />
          <div className="flex justify-center flex-col items-center ml-4">
            <h2 className=" text-xl  md:text-2xl font-bold">Por hacer</h2>
            <h3 className="text-xl font-bold">{tasksToDo}</h3>
          </div>
        </div>

        <div className="bg-green-500 rounded-md p-2 flex">
          <SiGoogletasks className="md:h-[40px] md:w-[40px] h-[30px] w-[30px]" />
          <div className="flex justify-center flex-col items-center ml-4">
            <h2 className="text-xl  md:text-2xl font-bold">Completadas</h2>
            <h3 className="text-xl font-bold">{tasksCompleted}</h3>
          </div>
        </div>
      </section>

      <section className="">
        <BasicGauge tasksToDo={tasksToDo} tasksCompleted={tasksCompleted} />
      </section>
    </Layout>
  );
};

export default StatisticPage;
