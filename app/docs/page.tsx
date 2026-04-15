import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'vedSecure Documentation',
	description:
		'Explore the full vedSecure documentation covering antivirus protection layers, services, deployment, response flows, automation, updates, and endpoint operations.',
}

const docsNav = [
	{ id: 'introduction', label: 'Introduction' },
	{ id: 'quick-start', label: 'Quick Start' },
	{ id: 'architecture', label: 'Architecture' },
	{ id: 'services', label: 'Core Services' },
	{ id: 'shield', label: 'vedSecure Shield' },
	{ id: 'scan-modes', label: 'Scan Modes' },
	{ id: 'threat-intel', label: 'Threat Intelligence' },
	{ id: 'policies', label: 'Policies & Controls' },
	{ id: 'quarantine', label: 'Quarantine & Recovery' },
	{ id: 'console', label: 'Admin Console' },
	{ id: 'automation', label: 'Automation' },
	{ id: 'updates', label: 'Updates & Release Channels' },
	{ id: 'integrations', label: 'Integrations' },
	{ id: 'github-pages', label: 'GitHub Pages Docs' },
	{ id: 'api', label: 'API Notes' },
	{ id: 'faq', label: 'FAQ' },
]

const serviceCards = [
	{
		title: 'Realtime Guard',
		description:
			'The always-on endpoint inspection service that watches file writes, script launches, process trees, autorun points, browser downloads, memory-sensitive actions, and suspicious persistence changes in real time.',
		details: [
			'Intervenes before a threat completes a full execution chain.',
			'Correlates parent and child process behavior for stronger verdict quality.',
			'Prioritizes suspicious actions over simple file matching alone.',
		],
	},
	{
		title: 'Behavior Engine',
		description:
			'A detection engine focused on intent and sequence rather than just signatures. It scores encoded commands, staged downloads, privilege abuse, burst file modification, credential access attempts, and tamper behavior.',
		details: [
			'Designed for low-prevalence and fast-changing threats.',
			'Improves visibility into suspicious but not yet known malware.',
			'Supports incident timelines with cause-and-effect context.',
		],
	},
	{
		title: 'Cloud Reputation',
		description:
			'A decision acceleration layer that uses prevalence, certificate trust, prior verdict history, release confidence, and file lineage to classify unknown software faster.',
		details: [
			'Speeds up allow, review, and block decisions.',
			'Reduces false positives on trusted internal tooling.',
			'Helps newly observed binaries get reviewed with more context.',
		],
	},
	{
		title: 'Exploit Defense',
		description:
			'A protection surface built around common endpoint entry paths such as browsers, document readers, collaboration tools, email attachments, scripting hosts, and productivity apps.',
		details: [
			'Protects typical attack surfaces without requiring users to change workflows.',
			'Adds resilience against malicious document and browser-driven chains.',
			'Works alongside Realtime Guard for broader execution coverage.',
		],
	},
	{
		title: 'Ransomware Barrier',
		description:
			'The ransomware-focused subsystem that monitors rapid encryption behavior, folder churn, file extension rewrites, backup interference, and monitored directory abuse.',
		details: [
			'Can isolate high-risk write behavior before wide damage spreads.',
			'Preserves context for post-incident review and restore planning.',
			'Supports protected folders for sensitive business data.',
		],
	},
	{
		title: 'Device Health Service',
		description:
			'Tracks heartbeat status, engine version, release channel, last scan, last policy sync, and protection health so administrators can immediately identify drift or stale endpoints.',
		details: [
			'Improves fleet visibility across remote and hybrid teams.',
			'Helps operators spot unhealthy devices before they become blind spots.',
			'Supports alert routing for outdated or disconnected endpoints.',
		],
	},
]

const scanModes = [
	[
		'Quick Scan',
		'Covers startup areas, active memory-sensitive processes, recent downloads, browser artifacts, and common launch points for rapid confidence checks.',
	],
	[
		'Full Scan',
		'Traverses the local filesystem, user profiles, mounted volumes, app data paths, archives within policy limits, and known high-risk locations.',
	],
	[
		'Smart Background Scan',
		'Adapts to active usage so endpoints remain protected during work hours with reduced interruption and dynamic throttling.',
	],
	[
		'Targeted Scan',
		'Used for one project, one folder, one removable drive, or one incident-specific surface when teams want precise validation.',
	],
]

const policyItems = [
	'Path, extension, signer, folder, and hash-based exclusions',
	'Trusted internal application rules for approved software',
	'Protected directory lists for ransomware-sensitive content',
	'Alert routing by severity, team, department, and device class',
	'Release channel assignment across stable, fast, and pilot groups',
	'Deferred update windows for roaming or bandwidth-limited devices',
]

const consolePanels = [
	'Fleet overview with health status, agent version, release channel, and last-seen telemetry',
	'Threat queue with severity, confidence, remediation state, and owner assignment',
	'Policy editor for scan depth, update rules, exclusions, folder protection, and auto-response',
	'Incident view with process lineage, affected files, timestamps, and operator history',
	'Release visibility for staged rollouts and compatibility monitoring',
	'Audit history for restore, suppress, isolate, delete, and policy modifications',
]

const automationItems = [
	'Automatic quarantine on high-confidence ransomware behavior',
	'Background rescans after restore or policy reassignment',
	'Escalation routes for unmanaged or unhealthy devices',
	'Webhook delivery for detections, policy changes, and endpoint drift',
	'Device isolation triggers for high-severity incident classes',
	'Recurring hygiene scans for executive, finance, and engineering groups',
]

const integrationItems = [
	'Webhook events for new threats, device offline events, scan completion, and policy updates',
	'Email and messaging hooks for high-severity routing',
	'Future-ready payment and provisioning hooks for subscription workflows',
	'Admin and reporting pipelines for SIEM, SOAR, and internal dashboards',
]

const faqItems = [
	[
		'How does vedSecure differ from a traditional antivirus?',
		'vedSecure combines signature-informed detection with behavior analysis, cloud reputation, policy orchestration, and guided remediation so operators are not limited to a simple allow-or-block model.',
	],
	[
		'Can vedSecure be used by individuals and companies?',
		'Yes. The product model supports single devices, small teams, and larger managed fleets with different policy depth depending on who is operating the environment.',
	],
	[
		'What makes vedSecure Shield special?',
		'vedSecure Shield is the opinionated protection layer that bundles stronger defaults, clearer incident surfacing, and faster rollout for teams that want reliable protection without a heavy initial setup cycle.',
	],
	[
		'Can the docs live as a static site?',
		'Yes. The structure of this documentation route can be exported or mirrored into a static documentation experience for public product education and marketing-style technical reference.',
	],
]

function SectionTitle({
	id,
	eyebrow,
	title,
	description,
}: {
	id: string
	eyebrow: string
	title: string
	description: string
}) {
	return (
		<div id={id} className='scroll-mt-28'>
			<p className='mb-3 text-xs uppercase tracking-[0.28em] text-[#7f838a]'>{eyebrow}</p>
			<h2 className='text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl'>{title}</h2>
			<p className='mt-4 max-w-3xl text-sm leading-7 text-[#a0a4ab] sm:text-base'>{description}</p>
		</div>
	)
}

function CodeBlock({ children }: { children: React.ReactNode }) {
	return (
		<pre className='overflow-x-auto rounded-[20px] border border-white/10 bg-[#0f1113] p-5 text-sm leading-7 text-[#c7ccd2]'>
			<code>{children}</code>
		</pre>
	)
}

export default function DocsPage() {
	return (
		<main className='min-h-screen bg-[#090a0b] pt-[calc(var(--header-top)+var(--header-height)+32px)] text-white'>
			<div className='mx-auto max-w-[1380px] px-6 pb-24 lg:px-8'>
				<div className='mb-12 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 md:p-10'>
					<p className='mb-4 text-sm uppercase tracking-[0.32em] text-[#7f838a]'>vedSecure documentation</p>
					<h1 className='max-w-5xl text-4xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-6xl'>
						Bootstrap-style product docs for a modern antivirus platform.
					</h1>
					<p className='mt-6 max-w-4xl text-base leading-8 text-[#a0a4ab]'>
						This documentation hub explains how vedSecure protects endpoints, how each internal
						service contributes to detection and remediation, how policies shape behavior across
						fleets, and how the product can be documented, published, and expanded into a
						full-scale public knowledge base.
					</p>
					<div className='mt-8 flex flex-wrap gap-3'>
						<Link href='/sign-up' className='inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f2f2f2]'>
							Start protection
						</Link>
						<Link href='/#pricing' className='inline-flex h-11 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:bg-white/10'>
							View pricing
						</Link>
					</div>
				</div>

				<div className='grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]'>
					<aside className='lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]'>
						<div className='rounded-[24px] border border-white/10 bg-white/[0.03] p-5'>
							<p className='mb-4 text-xs uppercase tracking-[0.24em] text-[#7f838a]'>Browse docs</p>
							<nav className='space-y-2'>
								{docsNav.map((item) => (
									<a
										key={item.id}
										href={`#${item.id}`}
										className='block rounded-xl px-3 py-2 text-sm text-[#b8bcc2] transition hover:bg-white/[0.05] hover:text-white'>
										{item.label}
									</a>
								))}
							</nav>
						</div>
					</aside>

					<div className='space-y-20'>
						<section className='space-y-8'>
							<SectionTitle
								id='introduction'
								eyebrow='Introduction'
								title='What vedSecure is designed to be'
								description='vedSecure is a modern antivirus and endpoint protection platform built around layered detection, response clarity, and operational usability. Instead of presenting security as a single passive scanner, the product is structured as a set of tightly coordinated services that protect, explain, and respond.'
							/>
							<div className='grid gap-4 md:grid-cols-3'>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#c4c8ce]'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Primary goal</p>
									Reduce the time between suspicious activity and safe operator action.
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#c4c8ce]'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Audience</p>
									Individuals, startups, internal IT teams, managed operators, and hybrid organizations.
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#c4c8ce]'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Product style</p>
									Dense technical coverage, high-trust controls, and clear workflows instead of vague dashboards.
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='quick-start'
								eyebrow='Quick start'
								title='The baseline deployment flow'
								description='The quickest way to think about vedSecure is as a coordinated set of device, policy, reputation, and response services. A normal first deployment installs the endpoint agent, assigns a policy, synchronizes release channels, and enables realtime inspection with default response behavior.'
							/>
							<CodeBlock>{`1. Install the vedSecure agent on the target endpoint or fleet cohort
2. Attach the endpoint to a policy group
3. Enable Realtime Guard and Behavior Engine defaults
4. Choose a release channel: stable, fast, or pilot
5. Run a quick scan to validate the local environment
6. Confirm device health, heartbeat status, and policy sync`}</CodeBlock>
							<CodeBlock>{`{
  "deviceGroup": "engineering-pilot",
  "releaseChannel": "stable",
  "realtimeProtection": true,
  "behaviorEngine": true,
  "ransomwareBarrier": true,
  "scheduledScan": "daily",
  "alertRouting": ["security", "it-ops"]
}`}</CodeBlock>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='architecture'
								eyebrow='Architecture'
								title='How the platform is structured'
								description='At the platform level, vedSecure combines endpoint-side observation with centrally managed policy and reputation systems. That makes it possible to react locally at high speed while still giving operators global context and consistent control.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<div className='grid gap-4 md:grid-cols-2'>
									<div className='rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-7 text-[#a0a4ab]'>
										<p className='mb-2 text-white'>Endpoint layer</p>
										Local inspection, script evaluation, process lineage, persistence monitoring, folder protection, and fast response actions happen close to the device.
									</div>
									<div className='rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-7 text-[#a0a4ab]'>
										<p className='mb-2 text-white'>Control layer</p>
										Policy orchestration, release channels, exclusions, response defaults, and audit visibility are managed centrally for consistency.
									</div>
									<div className='rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-7 text-[#a0a4ab]'>
										<p className='mb-2 text-white'>Reputation layer</p>
										Unknown binaries and low-prevalence artifacts are scored through reputation history, signer trust, and prior verdicts to accelerate decisions.
									</div>
									<div className='rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-7 text-[#a0a4ab]'>
										<p className='mb-2 text-white'>Response layer</p>
										Incidents preserve context, remediation history, restore rules, and operator actions so threat review remains actionable after the initial alert.
									</div>
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='services'
								eyebrow='Core services'
								title='Service-by-service explanation of how vedSecure works'
								description='Each vedSecure service is responsible for a distinct operational surface. Together they form a protection model that is faster and more resilient than a single static engine.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{serviceCards.map((card) => (
									<div key={card.title} className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
										<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{card.title}</h3>
										<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>{card.description}</p>
										<ul className='mt-4 space-y-2 text-sm leading-7 text-[#c1c6cc]'>
											{card.details.map((detail) => (
												<li key={detail} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3'>
													{detail}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='shield'
								eyebrow='vedSecure Shield'
								title='The opinionated protection layer'
								description='vedSecure Shield is the guided mode for teams that want stronger default protection without manually tuning every control from day one. It bundles aggressive but sensible defaults, clearer prioritization, and a streamlined review experience.'
							/>
							<div className='grid gap-4 md:grid-cols-3'>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>Recommended policy presets for ransomware defense, browser protection, and script abuse monitoring.</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>Sharper alert prioritization so severe incidents surface before low-value background noise.</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>Faster rollout for small and medium teams that want strong protection without a long tuning cycle.</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='scan-modes'
								eyebrow='Scan modes'
								title='How scanning works across different use cases'
								description='vedSecure treats scanning as a flexible workflow rather than a single heavy action. Different scan types exist for confidence checks, deep review, background safety, and incident-driven validation.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{scanModes.map(([name, copy]) => (
									<div key={name} className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
										<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{name}</h3>
										<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>{copy}</p>
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='threat-intel'
								eyebrow='Threat intelligence'
								title='How threat knowledge feeds better protection'
								description='Threat intelligence in vedSecure is not limited to a list of known bad files. It includes trust scoring, prevalence, signer history, execution ancestry, suspicious action combinations, and release-aware confidence.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6 text-sm leading-8 text-[#a0a4ab]'>
								vedSecure uses threat knowledge to decide not only whether something is malicious, but also how certain the platform is, how broadly the same pattern has been observed, whether similar binaries have already been classified, and whether the endpoint should be blocked, quarantined, or escalated for human review. This is especially important for low-prevalence binaries, script chains, and suspicious-but-not-yet-confirmed behavior that would be missed by a purely static engine.
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='policies'
								eyebrow='Policies & controls'
								title='How administrators shape behavior across a fleet'
								description='Policies are what make the same platform behave correctly for different environments. Engineering workstations, executive devices, finance endpoints, and shared systems often need different thresholds and trust rules.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<ul className='grid gap-4 md:grid-cols-2'>
									{policyItems.map((item) => (
										<li key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-[#a0a4ab]'>
											{item}
										</li>
									))}
								</ul>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='quarantine'
								eyebrow='Quarantine & recovery'
								title='What happens after a threat is contained'
								description='Quarantine is a controlled review space rather than a blind trash bin. vedSecure preserves file metadata, original location, verdict reason, and operator history to make later decisions safer.'
							/>
							<CodeBlock>{`Quarantine workflow

1. Threat is blocked or intercepted
2. Artifact is moved into a non-executable isolated store
3. Original file path, hash, policy state, and detection reason are preserved
4. Administrator can delete, keep isolated, restore, or mark as trusted
5. Optional rescan validates the surrounding directory after restore`}</CodeBlock>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='console'
								eyebrow='Admin console'
								title='The control plane for operators and analysts'
								description='The admin console is where device health, threat visibility, policy assignment, updates, and audit trails come together. It is designed to support real security work rather than passive status viewing.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{consolePanels.map((item) => (
									<div key={item} className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>
										{item}
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='automation'
								eyebrow='Automation'
								title='Response automation and repetitive security workflows'
								description='vedSecure supports a wide range of operational automations so common actions do not have to wait for a human every time. Automation is especially useful for high-confidence threats and fleet hygiene.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{automationItems.map((item) => (
									<div key={item} className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>
										{item}
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='updates'
								eyebrow='Updates & release channels'
								title='How the platform evolves safely'
								description='Not every environment wants to receive new protection logic at the same speed. vedSecure uses staged release channels so new behavior can be validated without forcing the whole fleet to change at once.'
							/>
							<div className='grid gap-4 md:grid-cols-3'>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
									<h3 className='text-lg font-medium text-white'>Stable</h3>
									<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>Recommended for most environments where compatibility and predictable rollout matter most.</p>
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
									<h3 className='text-lg font-medium text-white'>Fast</h3>
									<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>For security-forward teams that want quicker protection improvements and are comfortable validating changes earlier.</p>
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
									<h3 className='text-lg font-medium text-white'>Pilot</h3>
									<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>For champion devices and test cohorts used to confirm new behavior before wider rollout.</p>
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='integrations'
								eyebrow='Integrations'
								title='How vedSecure fits into larger systems'
								description='vedSecure is designed to sit inside broader operational workflows. Detection data, policy changes, device health, and notifications can all be routed into external systems where needed.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{integrationItems.map((item) => (
									<div key={item} className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>
										{item}
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='github-pages'
								eyebrow='GitHub Pages docs'
								title='Using this documentation style for a public docs portal'
								description='The Bootstrap reference works well because it combines a sticky navigation rail, deep section anchors, strong typographic hierarchy, and dense but segmented content. The vedSecure docs route now follows the same pattern and can also serve as the source model for a static public documentation portal.'
							/>
							<CodeBlock>{`Suggested public documentation structure

/docs
/docs/getting-started
/docs/protection-layers
/docs/policies
/docs/deployment
/docs/integrations
/docs/faq

Recommended publishing approach

1. Keep dense reference content in reusable page sections
2. Export static docs for a public knowledge base if needed
3. Preserve anchor-based navigation for deep linking
4. Add version labels when protection logic changes
5. Separate admin-only operational notes from public product education`}</CodeBlock>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='api'
								eyebrow='API notes'
								title='Representative API and event concepts'
								description='A mature security product benefits from event-driven hooks and readable interfaces. Even before a public API is finalized, documentation should make the event model clear.'
							/>
							<CodeBlock>{`GET /api/devices
GET /api/incidents
POST /api/policies/:id/assign
POST /api/quarantine/:id/restore
POST /api/devices/:id/isolate

Example webhook events

threat.created
threat.quarantined
device.offline
device.unhealthy
scan.completed
policy.updated`}</CodeBlock>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='faq'
								eyebrow='FAQ'
								title='Frequently asked questions'
								description='A compact reference for common questions about product behavior, rollout, docs structure, and platform depth.'
							/>
							<div className='space-y-4'>
								{faqItems.map(([question, answer]) => (
									<div key={question} className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
										<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{question}</h3>
										<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>{answer}</p>
									</div>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	)
}
