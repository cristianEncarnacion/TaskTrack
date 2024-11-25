// import React, { createContext, useContext, useState, useEffect } from "react";
// import { supabase } from "../backend/Database";
// import { useAuth } from "./AuthContext";

// interface SettingsContextType {
//   theme: string;
//   sound: boolean;
//   setTheme: React.Dispatch<React.SetStateAction<string>>;
//   setSound: React.Dispatch<React.SetStateAction<boolean>>;
//   fetchSettingsTheme: () => Promise<void>;
// }

// const SettingsContext = createContext<SettingsContextType | undefined>(
//   undefined
// );

// export const SettingsProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [theme, setTheme] = useState<string>("light");
//   const [sound, setSound] = useState<boolean>(true);
//   const { user } = useAuth();

//   // Efecto para aplicar el tema al body
//   useEffect(() => {
//     document.body.classList.remove("theme-light", "theme-dark");
//     document.body.classList.add(
//       theme === "light" ? "theme-light" : "theme-dark"
//     );
//   }, [theme]);
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
//         setTheme(data[data.length - 1].theme);
//       }
//     };

//     fetchSettingsTheme();
//   }, [user, setTheme]);
//   const fetchSettingsTheme = async () => {
//     const { data, error } = await supabase
//       .from("settings")
//       .select("theme, sound")
//       .eq("user_id", user.id);

//     if (error) {
//       console.error("Error al obtener los datos de configuración:", error);
//       return;
//     }

//     if (data && data.length > 0) {
//       console.log(data);
//       setTheme(data[data.length - 1].theme);
//     }
//   };

//   return (
//     <SettingsContext.Provider
//       value={{ setTheme, theme, sound, setSound, fetchSettingsTheme }}
//     >
//       {children}
//     </SettingsContext.Provider>
//   );
// };

// export const useSettings = () => {
//   const context = useContext(SettingsContext);
//   if (!context) {
//     throw new Error("useSettings debe usarse dentro de SettingsProvider");
//   }
//   return context;
// };
