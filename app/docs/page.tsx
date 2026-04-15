import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'vedSecure Docs',
	description:
		'Explore detailed vedSecure documentation covering antivirus features, deployment, protection layers, policies, alerts, updates, and platform support.',
}

const docsNav = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'capabilities', label: 'Protection Layers' },
	{ id: 'scan-modes', label: 'Scan Modes' },
	{ id: 'platforms', label: 'Supported Platforms' },
	{ id: 'deployment', label: 'Deployment' },
	{ id: 'console', label: 'Admin Console' },
	{ id: 'policies', label: 'Policies & Exclusions' },
	{ id: 'alerts', label: 'Alerts & Response' },
	{ id: 'shield', label: 'vedSecure Shield' },
	{ id: 'updates', label: 'Updates & Rollback' },
	{ id: 'privacy', label: 'Privacy & Telemetry' },
	{ id: 'api', label: 'API & Integrations' },
	{ id: 'best-practices', label: 'Best Practices' },
	{ id: 'faq', label: 'FAQ' },
]

const protectionLayers = [
	{
		title: 'Real-time protection',
		copy:
			'Watches file activity, process launches, memory behavior, script execution, and suspicious persistence changes in real time so threats can be blocked before they spread.',
	},
	{
		title: 'Behavioral detection',
		copy:
			'Tracks suspicious chains of activity such as credential dumping attempts, ransomware-like write patterns, rapid process spawning, and unsigned script abuse.',
	},
	{
		title: 'Cloud reputation',
		copy:
			'Checks file and process fingerprints against vedSecure reputation services to accelerate decision-making for newly seen binaries and high-risk payloads.',
	},
	{
		title: 'Exploit hardening',
		copy:
			'Applies anti-exploit protections to common application classes including browsers, document readers, collaboration tools, developer runtimes, and scripting hosts.',
	},
	{
		title: 'Ransomware containment',
		copy:
			'Detects encryption bursts, protects monitored directories, pauses malicious write behavior, and preserves forensic context for rapid review.',
	},
	{
		title: 'USB and removable media inspection',
		copy:
			'Scans newly attached removable media, checks autorun behavior, and applies policy-driven restrictions for unknown devices and unsafe file types.',
	},
]

const scanModes = [
	{
		name: 'Quick Scan',
		target:
			'Common launch points, active processes, startup folders, browser extensions, scheduled tasks, and high-risk persistence locations.',
		bestFor: 'Fast confidence checks during the workday or when a user reports suspicious behavior.',
	},
	{
		name: 'Full Scan',
		target:
			'Entire local file system, attached drives, archives within policy limits, and application data paths used by common malware families.',
		bestFor: 'Deep review of unmanaged devices, incident follow-up, or periodic compliance sweeps.',
	},
	{
		name: 'Custom Scan',
		target:
			'Specific directories, file groups, removable media, developer workspaces, build artifacts, or department-owned storage areas.',
		bestFor: 'Focused triage for engineering, finance, security, or shared workstation environments.',
	},
	{
		name: 'Continuous Background Scan',
		target:
			'Files and processes touched during normal activity, with smart throttling to minimize performance overhead.',
		bestFor: 'Always-on protection without forcing users into long blocking scan sessions.',
	},
	{
		name: 'Scheduled Scan',
		target:
			'Policy-defined groups on recurring intervals with role-based reporting for team leads and administrators.',
		bestFor: 'Routine security hygiene across hybrid teams and managed devices.',
	},
]

const platforms = [
	{
		title: 'Windows',
		items: [
			'Windows 10 and 11 for business and managed endpoints',
			'Server-oriented coverage for administrative and application hosts',
			'Kernel-aware protections for process, memory, and startup abuse',
		],
	},
	{
		title: 'macOS',
		items: [
			'Apple Silicon and Intel support',
			'Protection for launch agents, login items, browser artifacts, and developer tooling',
			'Policy support for removable media, application trust, and scan scheduling',
		],
	},
	{
		title: 'Linux',
		items: [
			'Coverage for workstation and server distributions commonly used by engineering teams',
			'Scheduled and on-demand scans with policy-based exclusions',
			'Agent health visibility for cloud, on-prem, and hybrid deployments',
		],
	},
	{
		title: 'Remote and hybrid fleets',
		items: [
			'Stable behavior on roaming devices and intermittent networks',
			'Deferred update windows and offline enforcement support',
			'Centralized status tracking even when teams are distributed across regions',
		],
	},
]

const deploymentModels = [
	'Single-team startup deployment with default recommended policies',
	'Department-by-department staged rollout with pilot groups',
	'MSP-style multi-environment deployment with separate policy boundaries',
	'Enterprise deployment with approval windows, maintenance schedules, and device cohorts',
]

const adminConsoleFeatures = [
	'Device inventory with health status, last seen time, and agent version',
	'Threat queue with severity, confidence, timeline, and remediation state',
	'Policy editor for scan intensity, update cadence, exclusions, and response rules',
	'Role-based access for security admins, analysts, IT operators, and observers',
	'Release visibility for stable and fast channels',
	'Audit history for policy changes, manual actions, and administrator activity',
]

const policyControls = [
	'Global or group-specific scan schedules',
	'Path, extension, hash, and signer-based exclusions',
	'Application allow rules for trusted internal tooling',
	'Network-aware update windows for remote devices',
	'Alert routing rules by severity, asset class, and team',
	'Ransomware directory protection lists',
]

const responseWorkflow = [
	'Detect and score the event',
	'Correlate with device state and recent activity',
	'Apply automatic blocking or quarantine if policy allows',
	'Create an analyst-visible incident record',
	'Preserve device context for investigation',
	'Offer remediation actions such as isolate, rescan, delete, restore, or suppress',
]

const updateChannels = [
	{
		title: 'Stable',
		copy:
			'Recommended for most organizations. Delivers vetted protection improvements with conservative rollout pacing and strong compatibility expectations.',
	},
	{
		title: 'Fast',
		copy:
			'Designed for security-forward teams that want faster access to protections, UI changes, and analysis improvements before they graduate into stable.',
	},
	{
		title: 'Pilot',
		copy:
			'Assigned to internal test devices or champion groups to validate release behavior before broad deployment across production endpoints.',
	},
]

const telemetryRules = [
	'Security event summaries are captured to improve visibility and response workflows.',
	'Administrators can control which device context fields are visible to different roles.',
	'vedSecure separates operational telemetry from user-facing content whenever possible.',
	'Policy-driven retention settings help organizations align with internal review requirements.',
]

const integrationItems = [
	'Webhooks for new threat, device offline, policy updated, and scan completed events',
	'Export-friendly incident objects for SIEM or SOAR pipelines',
	'Email and chat notifications for urgent threat routing',
	'Future-ready payment and provisioning hooks for subscription workflows',
	'Role-based admin APIs for device group management and policy assignment',
]

const bestPractices = [
	'Start with a pilot group before enabling aggressive response actions across the full fleet.',
	'Keep exclusions narrow and time-boxed wherever possible.',
	'Use separate policy groups for engineering devices, admin devices, and shared workstations.',
	'Review fast-channel updates with a small internal cohort before production-wide rollout.',
	'Combine scheduled full scans with continuous background scanning for balanced coverage.',
	'Route high-severity alerts to both security and IT ownership paths to avoid blind spots.',
]

const faqs = [
	{
		q: 'Is vedSecure only for businesses?',
		a: 'No. vedSecure is described here as business-ready, but the product model also supports individuals, small teams, and security-conscious remote workers who need stronger endpoint visibility.',
	},
	{
		q: 'Can vedSecure run without slowing down normal work?',
		a: 'Yes. The product documentation is built around lightweight background scanning, smart throttling, and policy-based scheduling so teams can stay protected without turning scans into a workflow blocker.',
	},
	{
		q: 'Does vedSecure support staged rollouts?',
		a: 'Yes. Policies, update channels, and deployment cohorts are all structured around staged rollouts so organizations can test before broad release.',
	},
	{
		q: 'Can teams connect vedSecure with their broader tooling?',
		a: 'Yes. The docs assume webhook, export, alert-routing, and admin API options so vedSecure can fit into larger operational security workflows.',
	},
]

const SectionTitle = ({
	id,
	eyebrow,
	title,
	description,
}: {
	id: string
	eyebrow: string
	title: string
	description: string
}) => (
	<div id={id} className='scroll-mt-28'>
		<p className='mb-3 text-xs uppercase tracking-[0.28em] text-[#7f838a]'>{eyebrow}</p>
		<h2 className='text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl'>
			{title}
		</h2>
		<p className='mt-4 max-w-3xl text-sm leading-7 text-[#a0a4ab] sm:text-base'>
			{description}
		</p>
	</div>
)

export default function DocsPage() {
	return (
		<main className='min-h-screen bg-[#090a0b] pt-[calc(var(--header-top)+var(--header-height)+32px)] text-white'>
			<div className='mx-auto max-w-[1280px] px-6 pb-24 lg:px-8'>
				<div className='mb-12 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 md:p-10'>
					<p className='mb-4 text-sm uppercase tracking-[0.32em] text-[#7f838a]'>
						vedSecure documentation
					</p>
					<h1 className='max-w-4xl text-4xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-6xl'>
						The complete made-up documentation hub for vedSecure antivirus.
					</h1>
					<p className='mt-6 max-w-3xl text-base leading-8 text-[#a0a4ab]'>
						This documentation experience is intentionally dense. It explains how
						vedSecure is positioned, what it protects, what platforms and teams it
						supports, how its imaginary technologies fit together, and how admins
						would operate it day to day.
					</p>
					<div className='mt-8 flex flex-wrap gap-3'>
						<Link
							href='/sign-up'
							className='inline-flex h-11 items-center justify-center rounded-[12px] bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f2f2f2]'>
							Start protection
						</Link>
						<Link
							href='/#pricing'
							className='inline-flex h-11 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:bg-white/10'>
							View pricing
						</Link>
					</div>
				</div>

				<div className='grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]'>
					<aside className='lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]'>
						<div className='rounded-[24px] border border-white/10 bg-white/[0.03] p-5'>
							<p className='mb-4 text-xs uppercase tracking-[0.24em] text-[#7f838a]'>
								On this page
							</p>
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
								id='overview'
								eyebrow='Overview'
								title='What vedSecure is designed to be'
								description='vedSecure is positioned as a modern antivirus and endpoint protection platform for individuals, startups, hybrid teams, and larger organizations that want strong security coverage without an overly heavy admin experience. The product balances fast detection, understandable incident review, flexible policy control, and realistic support for cross-platform fleets.'
							/>
							<div className='grid gap-4 md:grid-cols-3'>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Primary outcome</p>
									<p className='text-sm leading-7 text-[#c4c8ce]'>
										Reduce the time between suspicious activity and confident action.
									</p>
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Audience</p>
									<p className='text-sm leading-7 text-[#c4c8ce]'>
										Security leads, IT admins, endpoint owners, analysts, and small teams who still want enterprise-like clarity.
									</p>
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Product style</p>
									<p className='text-sm leading-7 text-[#c4c8ce]'>
										Deliberately clean, fast to learn, and built around actionable security workflows instead of noisy dashboards.
									</p>
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='capabilities'
								eyebrow='Protection layers'
								title='The main protection stack'
								description='vedSecure combines signature-style matching, behavioral analysis, cloud reputation, anti-exploit techniques, and policy-driven response actions. The point is not just to detect malware but to organize how different signals combine into a trustworthy decision.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{protectionLayers.map((item) => (
									<div key={item.title} className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
										<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{item.title}</h3>
										<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>{item.copy}</p>
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='scan-modes'
								eyebrow='Scan modes'
								title='How vedSecure approaches scanning'
								description='Scanning is treated as a layered activity instead of a single heavy operation. Teams can use fast quick scans for confidence checks, full scans for broad review, and scheduled or continuous scans for persistent protection.'
							/>
							<div className='space-y-4'>
								{scanModes.map((item) => (
									<div key={item.name} className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
										<div className='grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)]'>
											<div>
												<p className='text-lg font-medium tracking-[-0.02em] text-white'>{item.name}</p>
											</div>
											<div>
												<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Target</p>
												<p className='text-sm leading-7 text-[#a0a4ab]'>{item.target}</p>
											</div>
											<div>
												<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Best for</p>
												<p className='text-sm leading-7 text-[#a0a4ab]'>{item.bestFor}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='platforms'
								eyebrow='Supported platforms'
								title='Where vedSecure is expected to run'
								description='The documentation assumes vedSecure is cross-platform and practical for mixed fleets. That means support expectations are described not just by operating system but by how people actually use those devices.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{platforms.map((platform) => (
									<div key={platform.title} className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
										<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{platform.title}</h3>
										<ul className='mt-4 space-y-3 text-sm leading-7 text-[#a0a4ab]'>
											{platform.items.map((item) => (
												<li key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3'>
													{item}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='deployment'
								eyebrow='Deployment'
								title='Deployment models and rollout options'
								description='vedSecure documentation assumes flexibility from first install to enterprise rollout. The product is described as suitable for self-serve deployments, managed rollouts, and staged activation paths that reduce operational risk.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<div className='grid gap-4 md:grid-cols-2'>
									{deploymentModels.map((item) => (
										<div key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-[#a0a4ab]'>
											{item}
										</div>
									))}
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='console'
								eyebrow='Admin console'
								title='What administrators can manage'
								description='The vedSecure admin console is documented as a control plane rather than a passive reporting panel. It is meant to support visibility, policy assignment, release control, and security operations with clear role separation.'
							/>
							<div className='grid gap-4 md:grid-cols-2'>
								{adminConsoleFeatures.map((feature) => (
									<div key={feature} className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>
										{feature}
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='policies'
								eyebrow='Policies'
								title='Policies, exclusions, and operational controls'
								description='Endpoint security is only as usable as its policy model. vedSecure is documented as having policy controls that are specific enough for serious teams but still understandable for day-to-day operators.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<ul className='grid gap-4 md:grid-cols-2'>
									{policyControls.map((item) => (
										<li key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-[#a0a4ab]'>
											{item}
										</li>
									))}
								</ul>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='alerts'
								eyebrow='Alerts & response'
								title='How incidents move from signal to action'
								description='vedSecure is documented around a response workflow that starts with signal quality and ends with remediation clarity. Alerts are not just notifications; they are the structure used to preserve context and coordinate follow-up.'
							/>
							<div className='space-y-3 rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								{responseWorkflow.map((step, index) => (
									<div key={step} className='flex gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4'>
										<div className='mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/10 text-xs text-[#7f838a]'>
											{index + 1}
										</div>
										<p className='text-sm leading-7 text-[#a0a4ab]'>{step}</p>
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='shield'
								eyebrow='vedSecure Shield'
								title='What makes vedSecure Shield different'
								description='vedSecure Shield is documented as the product’s opinionated protection experience. It combines lightweight ongoing security, prioritized alert surfaces, and clear rollout mechanics into a named protection layer that teams can adopt quickly.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<p className='text-sm leading-7 text-[#a0a4ab]'>
									vedSecure Shield is designed for teams that do not want to build
									their own security choreography out of scattered settings. It
									bundles recommended controls, smarter defaults, faster
									investigation views, and dependable endpoint hardening into one
									package. In product terms, Shield is where policy, visibility,
									and usability are meant to come together.
								</p>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='updates'
								eyebrow='Updates'
								title='Release channels, upgrades, and rollback thinking'
								description='The documentation assumes that antivirus software should not be updated blindly across a fleet. vedSecure therefore uses release channels and staged rollout practices that let teams balance access to new protections with operational confidence.'
							/>
							<div className='grid gap-4 md:grid-cols-3'>
								{updateChannels.map((channel) => (
									<div key={channel.title} className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
										<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{channel.title}</h3>
										<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>{channel.copy}</p>
									</div>
								))}
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='privacy'
								eyebrow='Privacy'
								title='Telemetry, visibility, and privacy posture'
								description='Security software needs data to be useful, but it also needs boundaries. The vedSecure docs position privacy as a configurable part of the admin experience rather than an afterthought hidden from operators.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<ul className='space-y-3'>
									{telemetryRules.map((item) => (
										<li key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-[#a0a4ab]'>
											{item}
										</li>
									))}
								</ul>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='api'
								eyebrow='API & integrations'
								title='How vedSecure fits into broader tooling'
								description='The product is documented with an integration posture in mind. That means events, device state, and policy changes are expected to be exportable, routable, and usable by external systems where teams need them.'
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
								id='best-practices'
								eyebrow='Best practices'
								title='Recommended operating habits'
								description='Even strong antivirus coverage benefits from good operational habits. This section describes how teams should structure rollout, ownership, exclusions, and update management for healthier long-term protection.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<div className='grid gap-4 md:grid-cols-2'>
									{bestPractices.map((item) => (
										<div key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-[#a0a4ab]'>
											{item}
										</div>
									))}
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='faq'
								eyebrow='FAQ'
								title='Frequently asked questions'
								description='A compact reference for common product-positioning and operational questions.'
							/>
							<div className='space-y-4'>
								{faqs.map((item) => (
									<div key={item.q} className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
										<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{item.q}</h3>
										<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>{item.a}</p>
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
