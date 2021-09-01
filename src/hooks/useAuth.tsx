import { User } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../utils/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') setUser(null);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);
  }, []);

  return {
    signIn: async () => await supabase.auth.signIn({ provider: 'google' }),
    signOut: async () => await supabase.auth.signOut(),
    user,
  };
};
