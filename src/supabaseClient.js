import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lkeifqciacuzdslcezxd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrZWlmcWNpYWN1emRzbGNlenhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTYyMzAsImV4cCI6MjA3MzQ5MjIzMH0.vyHZSY9v2qicCB2-wgFYJGNh1VvMOHfvAQkG-RW71h8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)