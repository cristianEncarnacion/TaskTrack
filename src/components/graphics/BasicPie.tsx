import { PieChart } from "@mui/x-charts/PieChart";

const BasicPie = ({
  tasksToDo,
  tasksCompleted,
}: {
  tasksToDo: number;
  tasksCompleted: number;
}) => {
  return (
    <div
      style={{ height: "300px" }}
      className="hidden md:block bg-white w-full md:w-[600px] rounded-md shadow-md mt-5 mx-auto"
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: tasksToDo, label: "Por hacer" },
              { id: 1, value: tasksCompleted, label: "Completados" },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BasicPie;
