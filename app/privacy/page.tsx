import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Changelog AI - How we handle your personal data and developer information.',
}

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl sm:text-6xl font-serif italic text-text-primary mb-6">Privacy Policy</h1>
          <p className="text-text-muted font-mono text-sm max-w-2xl">Last updated: April 15, 2026. This policy outlines how Changelog AI handles your personal data, GitHub information, and commits.</p>
        </div>
        
        <div className="space-y-8 text-text-primary">
          <section>
            <h2 className="text-2xl font-serif italic mb-4 text-text-primary">1. Information We Collect</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              When you use Changelog AI, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary font-mono text-sm">
              <li><strong>Account Data:</strong> Your name, email address, and GitHub profile information when you authenticate via OAuth.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our service, including the frequency of changelog generations.</li>
              <li><strong>Commit Data:</strong> The raw git commits and diffs you provide for generation. <em className="text-text-muted">Note that we do not permanently store your proprietary code unless you opt-in for historical tracking.</em></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4 text-text-primary">2. How We Use Your Information</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We rely on your data strictly to provide and improve the Changelog AI service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary font-mono text-sm">
              <li>To generate accurate release notes and semantic changelogs.</li>
              <li>To construct GitHub Releases and Twitter drafts on your behalf when authorized.</li>
              <li>To prevent abuse, spam, and ensure platform security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4 text-text-primary">3. Third-Party Services</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We process your commits using large language models from our AI partners (e.g., OpenAI). By using Changelog AI, you acknowledge that your commit messages are temporarily processed by these external APIs. We have strict data-processing agreements ensuring your data is not used to train public models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4 text-text-primary">4. Your Rights</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              You have the right to access, modify, or permanently delete your account and associated data. If you wish to revoke GitHub access, you can do so directly from your GitHub Developer settings.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-text-muted font-mono text-sm">
              If you have any questions or concerns about this policy, please reach out to us at <a href="mailto:privacy@changelog.ai" className="text-accent hover:underline">privacy@changelog.ai</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
