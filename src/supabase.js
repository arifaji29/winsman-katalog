// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// Dapatkan URL dan Key ini dari Dashboard Supabase Anda:
// Settings -> API -> Project URL & Project API Keys (anon/public)
const supabaseUrl = 'https://vqfdqwigexotdakpgdga.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZmRxd2lnZXhvdGRha3BnZGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyOTYxMzMsImV4cCI6MjA5MDg3MjEzM30.Sr1mp8bF0Cv077jXLQPgGiJ3JE3cN8FqzVbpT-mjLoQ'

export const supabase = createClient(supabaseUrl, supabaseKey)