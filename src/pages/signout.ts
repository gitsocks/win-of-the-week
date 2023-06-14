import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

export default () => {
  const { session } = useSessionContext();
  const supabase = useSupabaseClient();
  supabase.auth.signOut();

  return session?.user.id;
};
