// import { useEffect } from "react";
// import Layout from "../components/Layout";
// // import { useSettings } from "../context/SettingsContext";
// import { useAuth } from "../context/AuthContext";
// import { supabase } from "../backend/Database";

// const Settings = () => {
// //   const { theme, setTheme, setSound, sound } = useSettings();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!user || !user.id) return; // Validación de usuario

//     const fetchSettingsTheme = async () => {
//       const { data, error } = await supabase
//         .from("settings")
//         .select("theme, sound")
//         .eq("user_id", user.id);

//       if (error) {
//         console.error("Error al obtener los datos de configuración:", error);
//         return;
//       }

//       if (data && data.length > 0) {
//         console.log(data);
//         // setTheme(data[data.length - 1].theme);
//         // setSound(data[data.length - 1].sound);
//       }
//     };

//     fetchSettingsTheme();
//   }, [user, setTheme, setSound]);

//   console.log(theme, sound);

//   const changeTheme = async () => {
//     if (!user || !user.id) return; // Validación de usuario

//     const newTheme = theme === "light" ? "dark" : "light";
//     const { error } = await supabase.from("settings").upsert({
//       theme: newTheme,
//       sound: sound, // Mantener el sonido actual
//       user_id: user.id, // Especificar el usuario
//     });

//     if (error) {
//       console.error("Error cambiando el tema:", error);
//     } else {
//       setTheme(newTheme);
//     }
//   };

//   const changeSound = async () => {
//     if (!user || !user.id) return; // Validación de usuario

//     const { error } = await supabase.from("settings").upsert({
//       theme: theme, // Mantener el tema actual
//       sound: !sound, // Alternar sonido
//       user_id: user.id, // Especificar el usuario
//     });

//     if (error) {
//       console.error("Error cambiando el sonido:", error);
//     } else {
//       setSound(!sound);
//     }
//   };

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold">Configuración</h1>
//       <section className="gap-x-2 p-6 bg-white border rounded-xl w-full shadow-md flex flex-col">
//         {/* Cambiar tema */}
//         <div className="mb-4">
//           <h2 className="text-xl">Apariencia</h2>
//           <div className="flex gap-x-4">
//             <button
//               onClick={changeTheme}
//               className={`px-4 py-2 rounded-md ${
//                 theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               Modo Claro
//             </button>
//             <button
//               onClick={changeTheme}
//               className={`px-4 py-2 rounded-md ${
//                 theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               Modo Oscuro
//             </button>
//           </div>
//         </div>

//         {/* Configuración del timbre del Pomodoro */}
//         <div>
//           <h2 className="text-xl">Pomodoro</h2>
//           <div className="flex items-center gap-x-2">
//             <button
//               onClick={changeSound}
//               className={`px-4 py-2 rounded-md ${
//                 sound ? "bg-green-500 text-white" : "bg-red-500 text-white"
//               }`}
//             >
//               {sound ? "Desactivar Timbre" : "Activar Timbre"}
//             </button>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Settings;
