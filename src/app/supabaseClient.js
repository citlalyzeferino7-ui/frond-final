import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://supabase.com/dashboard/project/tqachuzztnpagpaczyzy/editor/34293?schema=public'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzIzNDExNTMsImV4cCI6MTc3MjM0ODM1M30.qMuZOpfiQuLcz0M9xHjHWJorbUBL-o6xQu8uWO3FOsM'
export const supabase = createClient(supabaseUrl, supabaseKey)