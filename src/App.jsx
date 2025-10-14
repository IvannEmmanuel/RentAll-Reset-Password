import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [newPassword, setNewPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  console.log(import.meta.env.VITE_SUPABASE_URL)
  console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)


  useEffect(() => {
    async function initSession() {
      const hash = window.location.hash
      const params = new URLSearchParams(hash.replace('#', '?'))
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })
        if (error) console.error('Session Error:', error.message)
        else console.log('Session established:', data)
      }
    }

    initSession()
  }, [])

  async function handleReset() {
    if (!newPassword) {
      setError('Please enter a new password')
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) setError(error.message)
    else {
      setError('')
      setSuccess(true)
    }
  }

  return (
    <div className="reset-container">
      <div className="card">
        {!success ? (
          <>
            <h1 className="title">Reset Password</h1>
            <p className="subtitle">
              Enter your new password below to update your account.
            </p>

            <input
              type="password"
              placeholder="New Password"
              className="input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button className="button" onClick={handleReset}>
              Update Password
            </button>
          </>
        ) : (
          <div className="success-container">
            <img src="/success-icon.png" alt="Success" className="success-icon" />
            <h2>Password Updated!</h2>
            <p>You can now log in with your new password.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
