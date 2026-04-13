'use client'

import { useState, useEffect, Suspense } from "react"
import { signIn } from "next-auth/react"
import { GitBranch, ArrowLeft, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSignUpInit = searchParams.get("signup") === "true"
  const [isSignUp, setIsSignUp] = useState(isSignUpInit)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newsletter, setNewsletter] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isSubmitError, setIsSubmitError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Instant Validation
  useEffect(() => {
    if (isSignUp && name && name.length < 2) {
      setNameError("Name must be at least 2 characters.")
    } else {
      setNameError("")
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email format.")
    } else {
      setEmailError("")
    }

    if (password && password.length < 8) {
      setPasswordError("Password must be at least 8 characters.")
    } else {
      setPasswordError("")
    }
  }, [email, password, name, isSignUp])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitError("")
    
    if (!email || !password || (isSignUp && !name)) {
      setIsSubmitError("Please fill in all required fields.")
      return
    }

    if (emailError || passwordError || nameError) {
      setIsSubmitError("Please fix the validation errors before submitting.")
      return
    }

    setIsLoading(true)
    
    try {
      if (isSignUp) {
        // Handle Registration
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        
        const result = await (await import("@/app/actions/auth")).signUp(formData)
        
        if (result.error) {
          setIsSubmitError(result.error)
          setIsLoading(false)
          return
        }
      }

      // Handle Login (either after signup or direct)
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (res?.error) {
        setIsSubmitError("Invalid email or password.")
        setIsLoading(false)
      } else {
        setSuccess(true)
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1500)
      }
    } catch (err) {
      setIsSubmitError("An unexpected error occurred.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg relative overflow-hidden w-full">
      <Link 
        href="/" 
        className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-mono text-xs z-20 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden xs:inline">Back to Home</span>
      </Link>
      
      {/* Background grid */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }}
      />
      
      <div className="relative z-10 mx-auto flex w-full max-w-[420px] flex-col justify-center space-y-6 sm:w-[420px] p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border shadow-2xl mt-12 sm:mt-0">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center pb-2 animate-fade-in">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg border border-border">
              <GitBranch className="h-6 w-6 text-accent" />
            </div>
          </div>
          <h1 className="font-serif italic text-4xl tracking-tight text-text-primary pt-2">
            {isSignUp ? "Create account" : "Welcome back"}
          </h1>
          <p className="font-mono text-xs text-text-secondary">
            {isSignUp ? "Join 12,000+ developers shipping faster." : "Log in to your account."}
          </p>
        </div>

        {success ? (
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-serif italic text-xl text-text-primary">{isSignUp ? "Registration successful!" : "Login successful!"}</h3>
            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              {isSignUp ? "We've created your account in the background." : "Welcome back."} Redirecting you to the dashboard momentarily.
            </p>
            <Link href="/" className="inline-block mt-4 w-full rounded-lg bg-accent h-11 leading-[44px] font-mono font-bold text-bg text-sm hover:bg-accent/90 transition-all">
               Go to Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-up style={{ animationDelay: '0.1s' }}">
            {/* Realtime API Error */}
            {isSubmitError && (
              <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg flex items-start gap-2 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-danger shrink-0 mt-0.5" />
                <span className="font-mono text-xs text-danger leading-relaxed">{isSubmitError}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Full Name Field (Sign Up Only) */}
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-1.5 flex flex-col"
                  >
                    <label className="font-mono text-[10px] text-text-secondary flex justify-between">
                      <span>FULL NAME <span className="text-accent">*</span></span>
                      {name && !nameError && <span className="text-text-code flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> OK</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted flex items-center justify-center">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                      <input 
                        type="text" 
                        required={isSignUp}
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full h-11 bg-bg border rounded-lg pl-10 pr-4 font-mono text-xs text-text-primary transition-all outline-none focus:ring-1 ${nameError ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border hover:border-border-hover focus:border-accent focus:ring-accent/20'}`}
                      />
                    </div>
                    {nameError && (
                      <span className="font-mono text-[10px] text-danger animate-fade-in">{nameError}</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="space-y-1.5 flex flex-col">
                <label className="font-mono text-[10px] text-text-secondary flex justify-between">
                  <span>EMAIL ADDRESS <span className="text-accent">*</span></span>
                  {email && !emailError && <span className="text-text-code flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Valid</span>}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input 
                    type="email" 
                    required
                    autoComplete="email"
                    placeholder="developer@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full h-11 bg-bg border rounded-lg pl-10 pr-4 font-mono text-xs text-text-primary transition-all outline-none focus:ring-1 ${emailError ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border hover:border-border-hover focus:border-accent focus:ring-accent/20'}`}
                  />
                </div>
                {emailError ? (
                  <span className="font-mono text-[10px] text-danger animate-fade-in">{emailError}</span>
                ) : (
                  <span className="font-mono text-[10px] text-text-muted opacity-80">We'll use this for your account recovery.</span>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 flex flex-col">
                <label className="font-mono text-[10px] text-text-secondary flex justify-between">
                  <span>PASSWORD <span className="text-accent">*</span></span>
                  {password && !passwordError && <span className="text-text-code flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Strong</span>}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-11 bg-bg border rounded-lg pl-4 pr-10 font-mono text-xs text-text-primary transition-all outline-none focus:ring-1 ${passwordError ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border hover:border-border-hover focus:border-accent focus:ring-accent/20'}`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && (
                  <span className="font-mono text-[10px] text-danger animate-fade-in">{passwordError}</span>
                )}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <AnimatePresence>
              {isSignUp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 pt-2"
                >
                  <input 
                    type="checkbox"
                    id="newsletter"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="h-4 w-4 rounded border-border bg-bg text-accent focus:ring-accent focus:ring-offset-bg accent-accent"
                  />
                  <label htmlFor="newsletter" className="font-mono text-[10px] text-text-muted leading-relaxed cursor-pointer select-none">
                    Send me occasional tips on faster engineering workflows and product updates.
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full flex items-center justify-center rounded-lg bg-accent h-11 font-mono font-bold text-bg text-sm transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isSignUp ? "Creating account..." : "Logging in..."}</>
              ) : (
                isSignUp ? "Create free account" : "Log in"
              )}
            </button>

            {/* Alternative Providers */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] font-mono">
                  <span className="bg-bg-surface px-2 text-text-muted uppercase tracking-widest">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                  className="flex items-center justify-center rounded-lg bg-bg border border-border h-10 font-mono text-[11px] text-text-primary transition-all hover:bg-bg-hover hover:-translate-y-0.5"
                >
                  <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub
                </button>
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="flex items-center justify-center rounded-lg bg-bg border border-border h-10 font-mono text-[11px] text-text-primary transition-all hover:bg-bg-hover hover:-translate-y-0.5"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </div>
            </div>

            {/* Toggle State */}
            <div className="mt-8 text-center text-xs font-mono text-text-muted">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => {
                  const newIsSignUp = !isSignUp;
                  setIsSignUp(newIsSignUp);
                  router.push(`/login${newIsSignUp ? '?signup=true' : ''}`, { scroll: false });
                }}
                className="text-text-primary hover:text-accent transition-colors underline decoration-border underline-offset-4 font-bold px-2 py-1 -mx-2"
              >
                {isSignUp ? "Log in instead" : "Sign up"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
       <div className="flex justify-center items-center h-screen bg-bg">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
       </div>
    }>
       <LoginFormContent />
    </Suspense>
  )
}
