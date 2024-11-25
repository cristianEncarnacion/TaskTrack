import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ibyqgyxekxrrfufvnotg.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlieXFneXhla3hycmZ1ZnZub3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDYyNjYsImV4cCI6MjA0NzUyMjI2Nn0.ad8zvNKMPmMHcNAtMWWCcDametI7qX1oyj_xsi-gdRw";
export const supabase = createClient(supabaseUrl, supabaseKey);
