import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'vedSecure Documentation',
	description:
		'Read the vedSecure documentation for antivirus features, endpoint coverage, policies, quarantine, deployment, updates, and integrations.',
}

const docsNav = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'engine', label: 'Detection Engine' },
	{ id: 'threats', label: 'Threat Coverage' },
	{ id: 'platforms', label: 'Platforms' },
	{ id: 'deployment', label: 'Deployment' },
	{ id: 'policies', label: 'Policies' },
	{ id: 'quarantine', label: 'Quarantine' },
	{ id: 'response', label: 'Response' },
	{ id: 'shield', label: 'vedSecure Shield' },
	{ id: 'updates', label: 'Updates' },
	{ id: 'integrations', label: 'Integrations' },
	{ id: 'troubleshooting', label: 'Troubleshooting' },
	{ id: 'faq', label: 'FAQ' },
]

const engineCards = [
	[
		'Real-time antivirus',
		'Inspects file writes, process launches, scripts, startup changes, macros, and suspicious execution chains as they happen.',
	],
	[
		'Behavior scoring',
		'Weights suspicious patterns such as encoded commands, privilege abuse, mass file changes, and tamper attempts instead of relying on one signal.',
	],
	[
		'Cloud reputation',
		'Uses prevalence, signer trust, and verdict history to accelerate decisions for newly seen software and low-trust binaries.',
	],
	[
		'Exploit hardening',
		'Adds protection around common attack surfaces including browsers, document readers, collaboration tools, and scripting hosts.',
	],
]

const threatCards = [
	[
		'Ransomware',
		'Detects encryption bursts, directory churn, shadow copy interference, and protected-folder access abuse.',
	],
	[
		'Credential theft',
		'Flags browser-store access, token scraping, memory theft indicators, and suspicious credential collection behavior.',
	],
	[
		'Script abuse',
		'Reviews PowerShell, shell scripts, batch chains, macro-driven launches, and staged downloaders with execution context.',
	],
	[
		'Persistence abuse',
		'Monitors startup folders, services, launch agents, login items, scheduled tasks, and hidden re-entry methods.',
	],
]

const platformCards = [
	[
		'Windows',
		'Supports business endpoints, shared systems, and administrative hosts with process, storage, and startup visibility.',
	],
	[
		'macOS',
		'Protects Apple Silicon and Intel devices across launch agents, browser artifacts, developer tooling, and removable media.',
	],
	[
		'Linux',
		'Covers engineering workstations and security-sensitive hosts with scan scheduling, binary review, and policy controls.',
	],
	[
		'Remote fleets',
		'Handles roaming laptops with offline-aware behavior, deferred updates, and centralized health reporting.',
	],
]

const deploymentItems = [
	'Self-serve deployment for a single user or a small team with secure defaults.',
	'Pilot rollout to a small device group before enabling stronger response actions.',
	'Department-based policies for engineering, finance, operations, and leadership devices.',
	'Large rollout support with release channels, maintenance windows, and staged policy activation.',
]

const policyItems = [
	'Path, extension, hash, signer, and folder exclusions',
	'Trusted application rules for internal tools and approved runtimes',
	'Scan schedules by device group and timezone',
	'Alert routing by severity, department, or endpoint type',
	'Protected folders for ransomware-sensitive data',
	'Deferred update windows for bandwidth-sensitive endpoints',
]

const quarantineItems = [
	'Moves suspicious files into a non-executable isolated store with original path and verdict context attached.',
	'Preserves operator actions so restore, delete, and suppress decisions remain visible in the audit trail.',
	'Can trigger a targeted rescan after restore to confirm the endpoint is clean before normal use resumes.',
	'Allows validated internal tools to be promoted into trusted policy after review.',
]

const responseSteps = [
	'Detect and score activity locally with process, file, and execution context.',
	'Correlate the event with policy level, recent activity, and endpoint state.',
	'Apply block, quarantine, terminate, or isolate when policy thresholds are met.',
	'Create an analyst-ready record with severity, timeline, and remediation options.',
	'Preserve ancestry, user context, file paths, and follow-up actions for review.',
]

const updateCards = [
	[
		'Stable channel',
		'The default release path for most organizations, designed for compatibility and measured rollout.',
	],
	[
		'Fast channel',
		'Delivers newer protections sooner for teams that want quicker access to detection and platform improvements.',
	],
	[
		'Pilot channel',
		'Reserved for champion devices and test groups that validate changes before wider deployment.',
	],
]

const integrationItems = [
	'Webhook events for new threats, policy changes, scan completion, and device health changes',
	'Export-friendly incident records for SIEM and SOAR workflows',
	'Email and chat notification routing for urgent incidents',
	'Administrative APIs for policy assignment, device grouping, and remediation actions',
]

const troubleshootingItems = [
	[
		'High CPU during a scan',
		'Enable throttling, review large archive or build directories, and shift deep scans to lower-activity hours.',
	],
	[
		'Internal tool flagged',
		'Review signer trust, prevalence, and parent process history before creating a narrow exclusion or trusted-app rule.',
	],
	[
		'Device stopped reporting',
		'Check agent health, local network restrictions, release channel assignment, and offline duration.',
	],
	[
		'Repeated low-risk alerts',
		'Tune policy thresholds, validate existing exclusions, and confirm related events are not being surfaced as duplicates.',
	],
]

const faqs = [
	[
		'Does vedSecure work for both individuals and businesses?',
		'Yes. vedSecure is structured to scale from a single protected device to a policy-managed fleet without changing the core operating model.',
	],
	[
		'Can vedSecure support developer machines without slowing normal work?',
		'Yes. Trusted tools, build paths, scan schedules, and exclusion boundaries can be tuned without losing the benefit of continuous protection.',
	],
	[
		'How does vedSecure reduce false positives?',
		'It combines local context, reputation, signer trust, execution ancestry, and behavior scoring instead of relying on one check.',
	],
	[
		'Can teams stage new protections before broad rollout?',
		'Yes. vedSecure supports pilot, fast, and stable channels so new protection logic can be validated with smaller cohorts first.',
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
			<h2 className='text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl'>
				{title}
			</h2>
			<p className='mt-4 max-w-3xl text-sm leading-7 text-[#a0a4ab] sm:text-base'>
				{description}
			</p>
		</div>
	)
}

function CardGrid({ items }: { items: string[][] }) {
	return (
		<div className='grid gap-4 md:grid-cols-2'>
			{items.map(([title, copy]) => (
				<div key={title} className='rounded-[24px] border border-white/10 bg-[#111315] p-5'>
					<h3 className='text-lg font-medium tracking-[-0.02em] text-white'>{title}</h3>
					<p className='mt-3 text-sm leading-7 text-[#a0a4ab]'>{copy}</p>
				</div>
			))}
		</div>
	)
}

export default function DocsPage() {
	return (
		<main className='min-h-screen bg-[#090a0b] pt-[calc(var(--header-top)+var(--header-height)+32px)] text-white'>
			<div className='mx-auto max-w-[1280px] px-6 pb-24 lg:px-8'>
				<div className='mb-12 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 md:p-10'>
					<p className='mb-4 text-sm uppercase tracking-[0.32em] text-[#7f838a]'>
						vedSecure documentation
					</p>
					<h1 className='max-w-4xl text-4xl font-medium leading-tight tracking-[-0.045em] text-white sm:text-6xl'>
						The operating guide for modern antivirus protection.
					</h1>
					<p className='mt-6 max-w-3xl text-base leading-8 text-[#a0a4ab]'>
						Explore how vedSecure protects endpoints, handles threats, manages
						policy, preserves investigation context, and helps teams scale
						protection across mixed environments.
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
								title='What vedSecure is built to do'
								description='vedSecure is a layered antivirus and endpoint protection platform designed for individuals, teams, and managed fleets that want strong protection with faster operational clarity.'
							/>
							<div className='grid gap-4 md:grid-cols-3'>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#c4c8ce]'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Core goal</p>
									Reduce the time between suspicious activity and confident action.
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#c4c8ce]'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Built for</p>
									Remote workers, startups, internal IT, security teams, and hybrid organizations.
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#c4c8ce]'>
									<p className='mb-2 text-xs uppercase tracking-[0.22em] text-[#7f838a]'>Operating model</p>
									Local protection, cloud reputation, policy controls, and guided remediation in one flow.
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='engine'
								eyebrow='Detection engine'
								title='How vedSecure reaches a verdict'
								description='vedSecure combines multiple layers instead of trusting a single check. That makes detections faster, more explainable, and more dependable across changing threat patterns.'
							/>
							<CardGrid items={engineCards} />
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='threats'
								eyebrow='Threat coverage'
								title='Threat classes vedSecure is designed to stop'
								description='The platform focuses on real endpoint risk, including ransomware, script abuse, credential theft, suspicious persistence, and attack chains that only become dangerous when several signals appear together.'
							/>
							<CardGrid items={threatCards} />
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='platforms'
								eyebrow='Platforms'
								title='Where vedSecure runs'
								description='vedSecure supports mixed fleets and different ways of working, from business laptops and administrative systems to developer machines and distributed remote devices.'
							/>
							<CardGrid items={platformCards} />
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='deployment'
								eyebrow='Deployment'
								title='Rollout models from first install to full fleet'
								description='The deployment model is designed to be safe by default while still giving larger environments room to stage stronger policy and faster release channels with control.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<div className='grid gap-4 md:grid-cols-2'>
									{deploymentItems.map((item) => (
										<div key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-[#a0a4ab]'>
											{item}
										</div>
									))}
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='policies'
								eyebrow='Policies'
								title='Policy controls, trust rules, and exclusions'
								description='vedSecure keeps policy flexible enough for serious security teams while remaining readable for day-to-day operators who need to understand what is actually being enforced.'
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
								eyebrow='Quarantine'
								title='Quarantine, restore, and review workflow'
								description='Quarantine in vedSecure preserves context rather than simply hiding a file. That makes restore decisions safer and keeps the audit trail useful during later review.'
							/>
							<div className='rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								<ul className='space-y-3'>
									{quarantineItems.map((item) => (
										<li key={item} className='rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-[#a0a4ab]'>
											{item}
										</li>
									))}
								</ul>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='response'
								eyebrow='Response'
								title='How incidents move from signal to action'
								description='vedSecure treats an alert as an investigation object. The system keeps enough context attached to each event so an operator can move from detection to remediation without losing the story behind the verdict.'
							/>
							<div className='space-y-3 rounded-[24px] border border-white/10 bg-[#111315] p-6'>
								{responseSteps.map((step, index) => (
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
								title='The guided protection mode for faster setup'
								description='vedSecure Shield bundles recommended protections, sharper defaults, and cleaner review surfaces into an opinionated layer that helps teams reach stronger coverage without a long setup cycle.'
							/>
							<div className='grid gap-4 md:grid-cols-3'>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>
									Recommended policies for teams that want secure defaults immediately.
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>
									Prioritized alerts that keep high-risk incidents visible while reducing noise.
								</div>
								<div className='rounded-[24px] border border-white/10 bg-[#111315] p-5 text-sm leading-7 text-[#a0a4ab]'>
									Faster rollout for ransomware defense, browser protection, and remote endpoint coverage.
								</div>
							</div>
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='updates'
								eyebrow='Updates'
								title='Release channels and update behavior'
								description='Protection changes should move at the speed your environment can handle. vedSecure supports staged updates so teams can validate new behavior before broad rollout.'
							/>
							<CardGrid items={updateCards} />
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='integrations'
								eyebrow='Integrations'
								title='How vedSecure fits into larger workflows'
								description='Alerts, device state, and policy activity can be routed outward so vedSecure fits naturally into security operations, reporting, and automation systems.'
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
								id='troubleshooting'
								eyebrow='Troubleshooting'
								title='Common issues and how to fix them'
								description='These are the most common operational questions teams hit after rollout, especially around scan behavior, internal tooling, reporting gaps, and policy noise.'
							/>
							<CardGrid items={troubleshootingItems} />
						</section>

						<section className='space-y-8'>
							<SectionTitle
								id='faq'
								eyebrow='FAQ'
								title='Frequently asked questions'
								description='A quick reference for common deployment and product-behavior questions.'
							/>
							<div className='space-y-4'>
								{faqs.map(([question, answer]) => (
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
