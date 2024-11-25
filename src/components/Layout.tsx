import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="grid grid-areas-custom grid-cols-[0px,1fr] md:grid-cols-[200px,1fr] grid-rows-[1fr,1fr] h-[100vh] ">
      <Sidebar />

      <main
        className="py-5 px-3  overflow-y-auto bg-[#f9f9f9]"
        style={{ gridArea: "content" }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
