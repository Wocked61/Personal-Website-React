import { createClient } from "@supabase/supabase-js";

// Your Supabase project configuration
const supabaseUrl = "https://fmoxjjvjibmtittuxxbm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtb3hqanZqaWJtdGl0dHV4eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNTIwNDAsImV4cCI6MjA2NjkyODA0MH0.thyE2IYRyo-u4L_meZjh1vMWeUV3evpIEnQ_yFu8NAE";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test function to verify connection - you can call this in browser console
export const testSupabaseConnection = async () => {
  try {
    console.log("🧪 Testing Supabase connection...");

    // Test basic connection
    const { data, error } = await supabase
      .from("visits")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("❌ Supabase connection failed:", error);
      return false;
    }

    console.log("✅ Supabase connection successful!");
    console.log("📊 Current visits count:", data);
    return true;
  } catch (err) {
    console.error("❌ Connection test failed:", err);
    return false;
  }
};

// Make test function available globally for debugging
if (typeof window !== "undefined") {
  window.testSupabaseConnection = testSupabaseConnection;
}
