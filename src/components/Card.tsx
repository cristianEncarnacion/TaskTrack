import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Card = ({ icon, title, description }: Props) => {
  return (
    <div className=" flex flex-col justify-center mw-[550px] rounded-md border p-4">
      <div className="flex gap-x-1 items-center py-4">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default Card;
