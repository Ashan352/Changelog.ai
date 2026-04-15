'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Github, Loader2, GitBranch, GitCommit, ChevronRight, Search, AlertCircle, RefreshCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Repo {
  id: number
  name: string
  full_name: string
  description: string
  updated_at: string
  stargazers_count: number
}

interface Branch {
  name: string
}

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
}

export function GitHubImport({ accessToken, plan }: { accessToken?: string | null, plan: string }) {
  const router = useRouter()
  const [step, setStep] = useState<'repo' | 'branch' | 'commits'>('repo')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [repos, setRepos] = useState<Repo[]>([])
  const [search, setSearch] = useState('')
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)
  
  const [branches, setBranches] = useState<Branch[]>([])
  const [selectedBranch, setSelectedBranch] = useState<string>('')
  
  const [commits, setCommits] = useState<Commit[]>([])
  const [selectedCommits, setSelectedCommits] = useState<string[]>([])

  useEffect(() => {
    if (accessToken) {
      fetchRepos()
    }
  }, [accessToken])

  const fetchRepos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: { Authorization: `token ${accessToken}` }
      })
      if (!res.ok) throw new Error('Failed to fetch repositories')
      const data = await reposFilter(await res.json())
      setRepos(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const reposFilter = (data: any[]) => {
    return data.map(r => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      updated_at: r.updated_at,
      stargazers_count: r.stargazers_count
    }))
  }

  const handleSelectRepo = async (repo: Repo) => {
    setSelectedRepo(repo)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://api.github.com/repos/${repo.full_name}/branches`, {
        headers: { Authorization: `token ${accessToken}` }
      })
      if (!res.ok) throw new Error('Failed to fetch branches')
      const data = await res.json()
      setBranches(data)
      setSelectedBranch(data[0]?.name || 'main')
      setStep('branch')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectBranch = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://api.github.com/repos/${selectedRepo?.full_name}/commits?sha=${selectedBranch}&per_page=30`, {
        headers: { Authorization: `token ${accessToken}` }
      })
      if (!res.ok) throw new Error('Failed to fetch commits')
      const data = await res.json()
      setCommits(data)
      // Auto-select top N commits based on plan
      const maxCount = plan === 'pro' ? 30 : 10
      setSelectedCommits(data.slice(0, maxCount).map((c: any) => c.sha))
      setStep('commits')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    const selectedText = commits
      .filter(c => selectedCommits.includes(c.sha))
      .map(c => c.commit.message)
      .join('\n')
    
    // Encode and redirect back to dashboard
    const params = new URLSearchParams({
      import_commits: selectedText,
      import_repo: selectedRepo?.name || '',
      import_version: 'Latest'
    })
    router.push(`/dashboard?${params.toString()}`)
  }

  const filteredRepos = repos.filter(r => 
    r.full_name.toLowerCase().includes(search.toLowerCase())
  )

  if (!accessToken) {
    return (
       <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="size-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
             <Github className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-serif italic text-text-primary mb-2">Connect GitHub</h2>
          <p className="text-text-muted font-mono text-sm max-w-md mb-8">
             We need permission to access your repositories to fetch commit history.
          </p>
          <button 
            onClick={() => router.push('/api/auth/signin/github')}
            className="px-8 h-12 rounded-full bg-accent text-text-primary font-mono text-sm font-bold shadow-lg hover:shadow-accent/40 active:scale-[0.98] transition-all"
          >
             Sign in with GitHub
          </button>
       </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <div className="flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-1">
               <Github className="h-3 w-3" />
               Step {step === 'repo' ? '1' : step === 'branch' ? '2' : '3'} of 3
            </div>
            <h1 className="text-3xl font-serif italic text-text-primary">
               {step === 'repo' ? 'Select Repository' : step === 'branch' ? 'Select Branch' : 'Select Commits'}
            </h1>
         </div>
         {step !== 'repo' && (
            <button 
              onClick={() => setStep(step === 'branch' ? 'repo' : 'branch')}
              className="px-4 h-9 rounded-full bg-bg border border-border text-text-muted font-mono text-xs hover:text-text-primary transition-colors flex items-center gap-2"
            >
               Back
            </button>
         )}
      </div>

      {/* Error State */}
      {error && (
         <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
            <div className="flex-1">
               <p className="text-sm font-mono text-danger font-bold">Error fetching data</p>
               <p className="text-xs font-mono text-danger/80 mt-1">{error}</p>
               <button onClick={fetchRepos} className="mt-3 text-xs font-mono underline hover:no-underline">Try again</button>
            </div>
         </div>
      )}

      {/* Main Content Area */}
      <div className="min-h-[400px]">
         <AnimatePresence mode="wait">
            {step === 'repo' && (
               <motion.div 
                 key="repo"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-6"
               >
                  <div className="relative group">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-accent transition-colors" />
                     <input 
                        type="text"
                        placeholder="Search your repositories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 bg-bg-surface border border-border rounded-xl pl-12 pr-4 font-mono text-sm text-text-primary focus:outline-none focus:border-accent/40 shadow-sm transition-all"
                     />
                  </div>

                  {loading ? (
                     <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">Scanning Repositories...</p>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredRepos.map(repo => (
                           <button
                             key={repo.id}
                             onClick={() => handleSelectRepo(repo)}
                             className="group flex flex-col items-start p-5 rounded-2xl bg-bg-surface border border-border hover:border-accent/30 hover:bg-bg-elevated/50 text-left transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.99]"
                           >
                              <div className="flex items-center justify-between w-full mb-2">
                                 <span className="font-mono text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">{repo.name}</span>
                                 <ChevronRight className="h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                              </div>
                              <p className="text-[11px] font-mono text-text-muted line-clamp-2 h-8 leading-relaxed mb-4">
                                 {repo.description || "No description provided."}
                              </p>
                              <div className="flex items-center justify-between w-full mt-auto">
                                 <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                                       <span className="size-1.5 rounded-full bg-accent opacity-50" />
                                       Updated {new Date(repo.updated_at).toLocaleDateString()}
                                    </div>
                                 </div>
                                 {repo.stargazers_count > 0 && (
                                    <span className="text-[10px] font-mono text-text-muted opacity-60">★ {repo.stargazers_count}</span>
                                 )}
                              </div>
                           </button>
                        ))}
                     </div>
                  )}
               </motion.div>
            )}

            {step === 'branch' && (
               <motion.div 
                 key="branch"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-8"
               >
                  <div className="bg-bg-surface border border-border rounded-3xl p-8 text-center space-y-6">
                     <div className="size-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                        <GitBranch className="h-10 w-10 text-accent" />
                     </div>
                     <div>
                        <h2 className="text-xl font-serif italic text-text-primary">{selectedRepo?.name}</h2>
                        <p className="text-text-muted font-mono text-[10px] uppercase tracking-widest mt-1 opacity-60">Select Branch to scan</p>
                     </div>
                     
                     <div className="max-w-xs mx-auto space-y-4 pt-4">
                        <select 
                          value={selectedBranch}
                          onChange={(e) => setSelectedBranch(e.target.value)}
                          className="w-full h-12 bg-bg border border-border rounded-xl px-4 font-mono text-sm text-text-primary focus:outline-none focus:border-accent/40 shadow-sm appearance-none cursor-pointer text-center"
                        >
                           {branches.map(b => (
                              <option key={b.name} value={b.name}>{b.name}</option>
                           ))}
                        </select>
                        <button 
                           onClick={handleSelectBranch}
                           disabled={loading}
                           className="w-full h-12 rounded-full bg-accent text-text-primary font-mono text-sm font-bold shadow-lg hover:shadow-accent/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                           {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue to Commits'}
                        </button>
                     </div>
                  </div>
               </motion.div>
            )}

            {step === 'commits' && (
               <motion.div 
                 key="commits"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-6"
               >
                  <div className="flex items-center justify-between px-2">
                     <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                        {selectedCommits.length} commits selected
                     </p>
                     <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                        {plan === 'pro' ? 'Unlimited' : 'Max 10 for Free Plan'}
                     </p>
                  </div>

                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                     {commits.map((commit, idx) => {
                        const isSelected = selectedCommits.includes(commit.sha)
                        const isFreeLimit = plan === 'free' && selectedCommits.length >= 10 && !isSelected
                        
                        return (
                           <button
                             key={commit.sha}
                             disabled={isFreeLimit}
                             onClick={() => {
                                if (isSelected) {
                                  setSelectedCommits(selectedCommits.filter(s => s !== commit.sha))
                                } else {
                                  setSelectedCommits([...selectedCommits, commit.sha])
                                }
                             }}
                             className={`w-full group flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                                isSelected 
                                  ? 'bg-accent/5 border-accent/30 ring-1 ring-accent/20' 
                                  : 'bg-bg-surface border-border hover:border-text-muted/30'
                             } ${isFreeLimit ? 'opacity-30 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
                           >
                              <div className={`mt-1 size-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'bg-accent border-accent' : 'border-border group-hover:border-text-muted/40'
                              }`}>
                                 {isSelected && <svg className="size-3 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className={`font-mono text-sm leading-snug truncate ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
                                    {commit.commit.message.split('\n')[0]}
                                 </p>
                                 <div className="flex items-center gap-3 mt-1.5 opacity-60">
                                    <span className="font-mono text-[9px] uppercase tracking-tighter">{commit.sha.slice(0, 7)}</span>
                                    <span className="size-1 rounded-full bg-border" />
                                    <span className="font-mono text-[9px] uppercase tracking-tighter">{new Date(commit.commit.author.date).toLocaleString()}</span>
                                 </div>
                              </div>
                           </button>
                        )
                     })}
                  </div>

                  <div className="pt-4 sticky bottom-0 bg-gradient-to-t from-bg via-bg to-transparent">
                     <button
                        onClick={handleConfirm}
                        disabled={selectedCommits.length === 0}
                        className="w-full h-14 rounded-full bg-accent text-text-primary font-mono text-base font-bold shadow-xl hover:shadow-accent/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                     >
                        <RefreshCcw className="h-5 w-5" />
                        Push to Generator
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  )
}
