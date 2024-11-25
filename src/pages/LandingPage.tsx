import { MdOutlineTaskAlt, MdArrowRightAlt } from "react-icons/md";
import { CiCalendar, CiClock2 } from "react-icons/ci";

import Card from "../components/Card";
import ContactForm from "../views/ContactForm";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };
  const handleSignup = () => {
    Navigate("/signup");
  };
  return (
    <>
      <div className=" min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                <MdOutlineTaskAlt className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                  TaskMaster
                </span>
              </a>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="#about"
                >
                  Acerca de{" "}
                </a>
                <a
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="#caracteristicas"
                >
                  Caracteristicas
                </a>
                <a
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="#contact"
                >
                  Contacto
                </a>
              </nav>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <button
                onClick={handleLogin}
                className="text-base hover:bg-slate-200 py-2 px-4 rounded-md transition-all duration-[0.6s]"
              >
                Iniciar sesión
              </button>
              <button
                onClick={handleSignup}
                className="text-base text-white bg-black py-2 px-4 rounded-md hover:opacity-[0.7]"
              >
                Registrarse
              </button>
            </div>
          </div>
        </header>

        <main
          id="about"
          className=" transition-task scroll-smooth container mx-auto px-4 py-8"
        >
          <section className="py-12 md:py-10 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Gestiona tus tareas como un profesional
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  TaskMaster te ayuda a organizar tu vida, aumentar tu
                  productividad y alcanzar tus metas.
                </p>
                <button
                  onClick={handleLogin}
                  className="mt-6 flex bg-black text-white py-2 px-4 items-center rounded-md hover:opacity-[0.9]"
                >
                  Comienza gratis <MdArrowRightAlt className="ml-2 h-6 w-6" />
                </button>
              </div>
            </div>
          </section>

          <section id="caracteristicas" className="  py-12 md:py-24 lg:py-24">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Características Principales
              </h2>
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <Card
                  icon={
                    <MdOutlineTaskAlt className="h-12 w-12 mb-4 text-primary" />
                  }
                  title="Calendario Interactivo"
                  description="Organiza tus tareas con etiquetas personalizadas y prioridades. Visualiza tus tareas en listas o en el calendario."
                />
                <Card
                  icon={<CiCalendar className="h-12 w-12 mb-4 text-primary" />}
                  title="Gestión de Tareas Avanzada"
                  description="Visualiza tus tareas con el calendario, puedes puedes ver los dias, semanas, meses y tambien cuenta con un apartado de agenda."
                />
                <Card
                  icon={<CiClock2 className="h-12 w-12 mb-4 text-primary" />}
                  title="Temporizador Pomodoro Incorporado"
                  description="Utiliza la técnica Pomodoro directamente en la aplicación. Configura intervalos de trabajo y descanso para maximizar tu productividad."
                />
                <Card
                  icon={
                    <MdOutlineTaskAlt className="h-12 w-12 mb-4 text-primary" />
                  }
                  title="Estadísticas y Análisis"
                  description="Estadísticas y Análisis sobre tu productividad. Visualiza gráficos de tareas completadas y más para optimizar tu flujo de trabajo."
                />
              </div>
            </div>
          </section>

          <section id="contact">
            <ContactForm />
          </section>
        </main>
        <footer className="bg-background/95 text-foreground py-8">
          <div className="container flex flex-col items-center">
            <p className=" text-center text-xl">
              Creado por{" "}
              <a
                href="https://cristianencarnacion.netlify.app/"
                className=" 
                text-primary hover:underline text-gray-700
              "
              >
                {" "}
                Cristian Encarnacion
              </a>
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://github.com/cristianEncarnacion/"
                className="text-xl text-primary bg-black text-white px-4 py-2 rounded-md"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/cristian-encarnacion-19649a304/"
                className="text-xl text-primary bg-black text-white px-4 py-2 rounded-md"
              >
                Linkedin
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
