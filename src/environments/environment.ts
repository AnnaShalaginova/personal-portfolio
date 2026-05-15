import { createClient } from '@supabase/supabase-js';

export const environment = {
  production: false,
  supabaseUrl: 'https://hqmrweubmpdxhqvdlate.supabase.co',
  supabaseKey: 'sb_publishable_Q_UXmiHdMevEypVa-uaSgg_ZgZ9q9f3'
};

export const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
