import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const BasicGauge = ({
  tasksToDo,
  tasksCompleted,
}: {
  tasksToDo: number;
  tasksCompleted: number;
}) => {
  const totalTasks = tasksToDo + tasksCompleted;
  const progress = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  return (
    <section className="bg-white md:w-[600px] w-full h-[500px]  rounded-md shadow-md mt-4 md:mt-10 mx-auto p-2">
      <h2 className="text-center text-2xl font-bold">
        Tienes {tasksToDo} {tasksToDo === 1 ? "tarea" : "tareas"} para hacer
      </h2>

      <Gauge
        value={progress}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: "translate(0px, 0px)",
          },
        }}
        text={() => `${tasksCompleted} / ${totalTasks}`}
      />
    </section>
  );
};

export default BasicGauge;
