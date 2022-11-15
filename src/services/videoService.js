import { createClient } from "@supabase/supabase-js";

// Supabase
const PROJECT_URL = "https://bdruzjgvrnrfagejzutu.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcnV6amd2cm5yZmFnZWp6dXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODkzODQsImV4cCI6MTk4Mzk2NTM4NH0.JVWBn_UKZIVnLozymTl-6ErVVrQVO3csadxPUgoppzI"
// Create a single supabase client for interacting with  database
const supabase = createClient(PROJECT_URL, API_KEY)

export function videoService() {
    return {
        getAllVideos() {
            // return supabase data(all videos)
            return supabase.from("videos")
                .select("*")

        }
    }
}