import { createClient } from "@supabase/supabase-js";

export const supabase= createClient(
    "https://cfolwugosxeggwomcsrg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmb2x3dWdvc3hlZ2d3b21jc3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDg1ODYsImV4cCI6MjA3NzE4NDU4Nn0.IUyPE1TKufHO_UVcMRnvcsaJFdl4WCAxe7Hn8LCYGkw"
)