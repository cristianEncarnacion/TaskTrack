import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../backend/Database";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { Tasks } from "../types/Task";
import { User } from "../types/Users";
interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  checkUser: () => void;
  fetchTasks: () => void;
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  tasks: Tasks[];
  logout: () => void;
  login: (email: string, password: string) => void;
  isAuth: boolean;
  error: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [lastActivity, setLastActivity] = useState<number>(
    +(localStorage.getItem("lastActivity") ?? Date.now())
  );
  const navigate = useNavigate();
  const publicRoutes = ["/", "/login", "/signup"];

  emailjs.init("YLea4EgShGfuaoMo4");

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email || "",
      });
      setIsAuth(true);
    }

    if (!session && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  };

  const fetchTasks = async () => {
    if (tasks && user) {
      let { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (data) {
        setTasks(data);
      } else {
        setTasks([]);
      }
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
    setIsAuth(false);
  };

  const login = async (email: string, password: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user.aud! === "authenticated") {
      setError("No hay sesión activa");
      console.log(session);
    } else {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Credenciales incorrectas");
        return;
      }

      setUser(
        data?.user ? { id: data.user.id, email: data.user.email || "" } : null
      );
      setIsAuth(true);
      navigate("/tasks");
    }
  };

  const sendEmailReminder = () => {
    const templateParams = {
      to_email: user?.email,
      subject: "Recordatorio de tareas pendientes",
      message:
        "Recuerda que tienes tareas pendientes por hacer. No olvides completarlas antes del plazo.",
    };

    emailjs
      .send("service_1z8xo77", "template_cans97c", templateParams)
      .then((response) => {
        console.log("Correo enviado", response);
      })
      .catch((error) => {
        console.error("Error al enviar el correo", error);
      });
  };

  const checkInactivity = () => {
    const currentTime = Date.now();
    const inactivityTime = currentTime - lastActivity;

    if (inactivityTime > 86400000) {
      sendEmailReminder();
    }
  };

  const updateLastActivity = () => {
    const currentTime = Date.now();
    setLastActivity(currentTime);
    localStorage.setItem("lastActivity", currentTime.toString());
  };

  useEffect(() => {
    const handleUserActivity = () => {
      updateLastActivity();
    };

    document.addEventListener("click", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    const inactivityCheckInterval = setInterval(checkInactivity, 60000);

    return () => {
      clearInterval(inactivityCheckInterval);
      document.removeEventListener("click", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };
  }, [lastActivity]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (!user) return;

    fetchTasks();
  }, [user]);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkUser,
        fetchTasks,
        setTasks,
        tasks,
        logout,
        login,
        isAuth,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
