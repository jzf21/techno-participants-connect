import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_ANON_KEY;
const SupabaseClient = createClient(supabaseUrl, supabaseSecretKey);
export default SupabaseClient;
