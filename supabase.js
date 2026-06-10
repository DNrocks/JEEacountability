const SUPABASE_URL =
    "https://skrclplwnvvualsfacga.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcmNscGx3bnZ2dWFsc2ZhY2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwOTY1NzUsImV4cCI6MjA5NjY3MjU3NX0.e-dlWzXdzfTbue8ZKB36z1ssagw8RjmMIoxU-M0Qb5Q";

const db = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);