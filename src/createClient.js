import { createClient } from "@supabase/supabase-js";

// Tu código lee el NOMBRE de la variable que configuraste en Render
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
    supabaseUrl, // Usas el valor de la variable de entorno
    supabaseAnonKey // Usas el valor de la variable de entorno
);