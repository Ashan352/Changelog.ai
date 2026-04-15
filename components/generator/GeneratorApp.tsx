'use client'
import { useState, useMemo, useEffect } from 'react'
import { useCompletion } from '@ai-sdk/react'
import { InputPanel } from './InputPanel'
import { OutputPanel } from './OutputPanel'
import { UpgradeModal } from '@/components/ui/UpgradeModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { parseTaggedResponse } from '@/lib/openrouter'

export function GeneratorApp({ plan }: { plan: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeReason, setUpgradeReason] = useState<'usage' | 'text'>('usage')
  const [hasStarted, setHasStarted] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState({ repoName: '', version: '', commitsCount: 0, isPublic: false });

  const initialValues = useMemo(() => {
    const import_commits = searchParams.get('import_commits')
    const import_repo = searchParams.get('import_repo')
    const import_version = searchParams.get('import_version')
    if (import_commits || import_repo) {
       return {
         commits: import_commits || '',
         repoName: import_repo || '',
         version: import_version || 'Latest'
       }
    }
    return undefined
  }, [searchParams])

  useEffect(() => {
    if (initialValues) {
      // Small delay to ensure state is captured before URL is cleaned
      const timer = setTimeout(() => {
        router.replace('/dashboard', { scroll: false })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [initialValues, router])

  const {
    complete,
    completion,
    isLoading,
    stop,
    setCompletion,
  } = useCompletion({
    api: '/api/generate',
    streamProtocol: 'text',
    onFinish: async (prompt, completionText) => {
      setHasCompleted(true)
      // Once stream finishes, save to history in a separate Serverless call
      const parsed = parseTaggedResponse(completionText);
      try {
        const res = await fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            repoName: lastParams.repoName || "Unnamed Project",
            version: parsed.version_detected || lastParams.version || "Latest",
            content: parsed.changelog,
            commitsCount: lastParams.commitsCount,
            isPublic: lastParams.isPublic,
          }),
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.id) setGenerationId(data.id);
          // Trigger a silent refresh to update Sidebar usage stats
          router.refresh();
        }
      } catch (err) {
        console.error("Failed to log history:", err);
      }
    },
    onError: (err) => {
      console.error(err)
      if (err.message.includes("Free limit reached")) {
        setUpgradeReason('usage')
        setShowUpgradeModal(true)
      } else {
        setError(err.message || "Failed to generate artifacts.")
      }
    }
  });

  const handleGenerate = async (commits: string, version: string, repoName?: string, isPublic?: boolean) => {
    if (!commits || commits.trim().length < 10) {
      setError("Input too short. Please provide more commit history (min 10 characters).")
      return
    }

    // Free plan character limit check (500 chars)
    if (plan !== 'pro') {
      const charCount = commits.trim().length;
      if (charCount > 500) {
        setError(`Free plan is limited to 500 characters per generation. Your input has ${charCount.toLocaleString()} characters. Upgrade for unlimited input.`);
        setUpgradeReason('text');
        setShowUpgradeModal(true);
        return;
      }
    }

    const count = commits.split('\n').filter(l => l.trim()).length;
    setLastParams({ repoName: repoName || '', version: version || '', commitsCount: count, isPublic: !!isPublic });

    setError(null)
    setHasStarted(true)
    setHasCompleted(false)
    setGenerationId(null)
    const targetCommits = commits || "Generate for current version";
    complete(targetCommits, { body: { commits: targetCommits, version, repoName, projectName: repoName } })
  }

  const handleReset = () => {
    setHasCompleted(false)
    setHasStarted(false)
    setGenerationId(null)
    setCompletion("")
  }

  // Parse tags on the fly for the output panel
  const data = useMemo(() => {
    if (!completion) return null;
    return parseTaggedResponse(completion);
  }, [completion]);

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col md:flex-row gap-6">
      {/* Input Panel */}
      <div className="w-full md:w-[400px] lg:w-[450px] shrink-0 flex flex-col gap-4">
        <InputPanel 
          onGenerate={handleGenerate} 
          isLoading={isLoading} 
          plan={plan} 
          initialValues={initialValues}
          hasCompleted={hasCompleted}
          onReset={handleReset}
        />
        
        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-xs font-mono">
            {error}
          </div>
        )}

        {isLoading && (
          <button 
            onClick={() => stop()}
            className="text-[11px] font-mono text-text-muted hover:text-danger text-left px-1 transition-colors"
          >
            Cancel generation?
          </button>
        )}
      </div>

      <div className="flex-1 min-w-0 h-[500px] md:h-auto">
        <OutputPanel 
          data={data} 
          isLoading={isLoading} 
          hasStarted={hasStarted} 
          rawResult={completion} 
          generationId={generationId}
          initialIsPublic={lastParams.isPublic}
        />
      </div>

      {/* Upgrade Modal Hook */}
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} reason={upgradeReason} />
    </div>
  )
}
