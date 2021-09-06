import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://mmicniopjryjhucdmakb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDMyMTkzNywiZXhwIjoxOTQ1ODk3OTM3fQ.3L2yHPaSOizIOAj5WvG8a3xfSHg9lIulJg1HuAZ_6Do',
);
