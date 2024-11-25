import React, { useState, useRef, useEffect } from "react";
import { User } from "../types/Users";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, error } = useAuth();
  const [values, setValues] = useState<User>({
    id: "",
    email: "",
    password: "",
  });
  const Focus = useRef<HTMLInputElement>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.email && values.password) {
      login(values.email, values.password);
    }
  };

  useEffect(() => {
    Focus.current?.focus();
  }, []);

  return (
    <div className="bg-[rgb(1,28,63)] flex justify-center items-center h-[100vh] p-[20px] flex-col ">
      <div className="bg-white text-gray-800 rounded-lg shadow-md p-5 max-w-md w-full">
        <h2 className="text-2xl mb-5 text-[#333]">Bienvenido</h2>
        <div>
          {error && (
            <p className=" text-black text-xl text-center mt-3 bg-red-500 py-3 mb-2">
              {error}
            </p>
          )}
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            ref={Focus}
            type="text"
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
          <button
            type="submit"
            className="text-xl hover:bg-[#004d99] p-3 border-none rounded-md bg-[#0066cc] text-white cursor-pointer duration-[0.3s] ease transition-all"
          >
            Iniciar Sesión
          </button>

          <div>
            <p className="mt-5 text-center">
              ¿No tienes una cuenta?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Regístrate
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
