'use client'
import { useState, useMemo } from 'react'
import { useCompletion } from '@ai-sdk/react'
import { InputPanel } from './InputPanel'
import { OutputPanel } from './OutputPanel'
import { UpgradeModal } from '@/components/ui/UpgradeModal'
import { useRouter } from 'next/navigation'
import { parseTaggedResponse } from '@/lib/openrouter'

export function GeneratorApp({ plan }: { plan: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [lastParams, setLastParams] = useState({ repoName: '', version: '', commitsCount: 0 });

  const {
    complete,
    completion,
    isLoading,
    stop,
  } = useCompletion({
    api: '/api/generate',
    streamProtocol: 'text',
    onFinish: async (prompt, completionText) => {
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
          }),
        });
        
        if (res.ok) {
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
        setShowUpgradeModal(true)
      } else {
        setError(err.message || "Failed to generate artifacts.")
      }
    }
  });

  const handleGenerate = async (commits: string, version: string, repoName?: string) => {
    if (!commits || commits.trim().length < 10) {
      setError("Input too short. Please provide more commit history (min 10 characters).")
      return
    }

    // Free plan word limit check (100 words)
    if (plan !== 'pro') {
      const wordCount = commits.trim().split(/\s+/).length;
      if (wordCount > 100) {
        setError(`Free plan is limited to 100 words per generation. Your input has ${wordCount} words. Please upgrade for unlimited processing.`);
        setShowUpgradeModal(true);
        return;
      }
    }

    const count = commits.split('\n').filter(l => l.trim()).length;
    setLastParams({ repoName: repoName || '', version: version || '', commitsCount: count });

    setError(null)
    setHasStarted(true)
    const targetCommits = commits || "Generate for current version";
    complete(targetCommits, { body: { commits: targetCommits, version, repoName, projectName: repoName } })
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
        <InputPanel onGenerate={handleGenerate} isLoading={isLoading} plan={plan} />
        
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

      {/* Output Panel */}
      <div className="flex-1 min-w-0 h-[500px] md:h-auto">
        <OutputPanel 
          data={data} 
          isLoading={isLoading} 
          hasStarted={hasStarted} 
          rawResult={completion} 
        />
      </div>

      {/* Upgrade Modal Hook */}
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  )
}
