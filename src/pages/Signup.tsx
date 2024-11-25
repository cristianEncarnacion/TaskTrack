import React, { useState, useRef, useEffect } from "react";
import { User } from "../types/Users";
import { supabase } from "../backend/Database";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { setUser, user } = useAuth();
  const [values, setValues] = useState<User>({
    id: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const Focus = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setError("");
      setMessage("");
    }, 5000);
    return () => clearInterval(interval);
  }, [error, message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      setError("Por favor llena todos los campos");
      return;
    }
    if (values.password !== values.confirm_password) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (values.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      let { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      console.log("datos", data);
      console.log("user", user);
      if (error) {
        setError("Error al crear el usuario");
        setMessage("");
        return;
      } else {
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || "",
            password: values.password,
            confirm_password: values.confirm_password,
          });
        } else {
          setError("Error al crear el usuario");
        }
        setValues({ id: "", email: "", password: "", confirm_password: "" });
        setError("");
        setMessage("Usuario creado con exito, confirma tu correo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Focus.current?.focus();
  }, []);

  return (
    <div className=" bg-[rgb(1,28,63)] flex justify-center items-center h-[100vh] p-[20px] flex-col ">
      <div className="bg-white text-gray-800 rounded-lg shadow-md p-5 max-w-md w-full">
        <h2 className="text-2xl mb-5 text-[#333]">Bienvenido</h2>
        {error && (
          <p className=" text-black text-xl text-center mt-3 bg-red-500 py-3 mb-2">
            {error}
          </p>
        )}
        {message && (
          <p className="text-black text-xl text-center mt-3 py-3 mb-2 bg-green-500">
            {message}
          </p>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            ref={Focus}
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={onChange}
            required
            className="text-base p-3 mb-2 border border-gray-300 rounded-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={values.password}
            onChange={onChange}
            required
            className="text-base p-3 mb-2 border border-gray-300 rounded-sm"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirma tu contraseña"
            value={values.confirm_password}
            onChange={onChange}
            required
            className="text-base p-3 mb-2 border border-gray-300 rounded-sm"
          />
          <button
            type="submit"
            className="text-xl hover:bg-[#004d99] p-3 border-none rounded-md bg-[#0066cc] text-white cursor-pointer duration-[0.3s] ease transition-all"
          >
            Iniciar Sesión
          </button>
          <div>
            <p className="mt-5 text-center">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Inicia Sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
