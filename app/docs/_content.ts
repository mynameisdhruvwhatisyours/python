export type DocSection = {
	id: string
	title: string
	body: string[]
	bullets?: string[]
	code?: string
}

export type DocPage = {
	slug: string
	title: string
	description: string
	eyebrow: string
	intro: string
	updated: string
	sections: DocSection[]
}

export const docsCategories = [
	{
		title: 'Getting started',
		summary: 'Launch vedSecure, deploy the agent, and understand the first-run protection flow.',
		links: [
			{ href: '/docs', label: 'Introduction' },
			{ href: '/docs/getting-started', label: 'Quick start' },
			{ href: '/docs/deployment', label: 'Deployment' },
		],
	},
	{
		title: 'Customize',
		summary: 'Tune policies, exclusions, scan profiles, and release behavior for different teams.',
		links: [
			{ href: '/docs/policies', label: 'Policies' },
			{ href: '/docs/scans', label: 'Scan profiles' },
			{ href: '/docs/release-channels', label: 'Release channels' },
		],
	},
	{
		title: 'Layout',
		summary: 'Understand how the admin console, fleet views, and operational workspace are structured.',
		links: [
			{ href: '/docs/admin-console', label: 'Admin console' },
			{ href: '/docs/fleet-management', label: 'Fleet management' },
		],
	},
	{
		title: 'Content',
		summary: 'Review threat timelines, reports, and long-lived incident artifacts.',
		links: [
			{ href: '/docs/threat-timeline', label: 'Threat timeline' },
			{ href: '/docs/reports', label: 'Reports' },
		],
	},
	{
		title: 'Forms',
		summary: 'Map how enrollment prompts, remediation requests, and operator submission flows behave.',
		links: [
			{ href: '/docs/enrollment-flows', label: 'Enrollment flows' },
			{ href: '/docs/incident-intake', label: 'Incident intake' },
		],
	},
	{
		title: 'Components',
		summary: 'Dive into the engines and product modules that drive protection and response.',
		links: [
			{ href: '/docs/realtime-guard', label: 'Realtime Guard' },
			{ href: '/docs/behavior-engine', label: 'Behavior Engine' },
			{ href: '/docs/shield', label: 'vedSecure Shield' },
			{ href: '/docs/ransomware-barrier', label: 'Ransomware Barrier' },
		],
	},
	{
		title: 'Helpers',
		summary: 'Use quarantine, recovery, and notification helpers to reduce response friction.',
		links: [
			{ href: '/docs/quarantine-recovery', label: 'Quarantine & recovery' },
			{ href: '/docs/notifications', label: 'Notifications' },
		],
	},
	{
		title: 'Utilities',
		summary: 'Automate workflows, connect integrations, and route product events into other systems.',
		links: [
			{ href: '/docs/automation', label: 'Automation' },
			{ href: '/docs/integrations', label: 'Integrations' },
			{ href: '/docs/api-events', label: 'API events' },
		],
	},
	{
		title: 'Extend',
		summary: 'Publish public-facing docs and grow the product ecosystem around vedSecure.',
		links: [
			{ href: '/docs/github-pages', label: 'GitHub Pages docs' },
			{ href: '/docs/public-docs', label: 'Public docs strategy' },
		],
	},
	{
		title: 'About',
		summary: 'Understand the platform model, operating assumptions, and common questions.',
		links: [
			{ href: '/docs/platform-overview', label: 'Platform overview' },
			{ href: '/docs/faq', label: 'FAQ' },
		],
	},
] as const

export const docsPages: Record<string, DocPage> = {
	'getting-started': {
		slug: 'getting-started',
		title: 'Quick Start',
		description: 'Install vedSecure, assign a policy, validate device health, and confirm baseline protection.',
		eyebrow: 'Getting started',
		intro:
			'vedSecure is designed so a new deployment reaches meaningful protection quickly. The quick-start path focuses on agent installation, policy attachment, release-channel selection, and first-pass verification.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'install',
				title: 'Install and enroll the agent',
				body: [
					'The vedSecure agent is the endpoint-side process responsible for local inspection, policy sync, and health reporting. A healthy install immediately registers device identity, operating context, and protection status.',
					'During enrollment, the device is attached to a default or preselected policy group so scan behavior, update cadence, and response defaults are applied before the first threat is encountered.',
				],
				code: `vedsecure agent install
vedsecure agent enroll --group "default-protection"
vedsecure agent status`,
			},
			{
				id: 'validate',
				title: 'Validate baseline coverage',
				body: [
					'After installation, run a quick validation pass. That should confirm realtime protection, policy version, release channel, and last heartbeat so the endpoint is not left partially configured.',
				],
				bullets: [
					'Confirm Realtime Guard is active',
					'Confirm the device has a policy assigned',
					'Confirm the selected release channel is correct',
					'Run a quick scan to verify the local engine path is healthy',
				],
			},
			{
				id: 'handoff',
				title: 'Move from first install to normal operation',
				body: [
					'Once a device has checked in successfully, operators typically move from onboarding into routine protection. That includes background scanning, release channel monitoring, and policy refinement based on device role.',
				],
			},
		],
	},
	deployment: {
		slug: 'deployment',
		title: 'Deployment',
		description: 'Roll vedSecure out across pilot groups, departments, and full fleets with staged policy control.',
		eyebrow: 'Getting started',
		intro:
			'Deployment in vedSecure is intentionally staged. Different groups can move at different speeds, and protection levels can be raised gradually without forcing a full fleet into the same posture on day one.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'models',
				title: 'Choose the deployment model',
				body: [
					'The most common deployment models are self-serve rollout, pilot-first rollout, and department-based rollout. Each one uses the same building blocks but applies them at different scales.',
				],
				bullets: [
					'Self-serve for one person or a very small team',
					'Pilot groups for testing aggressive protection safely',
					'Department rollouts for finance, engineering, and executive devices',
					'Fleet-wide activation after policy and compatibility validation',
				],
			},
			{
				id: 'staging',
				title: 'Stage policy and release behavior',
				body: [
					'Staging is where vedSecure becomes operationally safe. Instead of only validating whether the agent runs, teams validate whether the protection model behaves correctly for real workloads, internal tools, and roaming endpoints.',
				],
			},
			{
				id: 'checklist',
				title: 'Deployment checklist',
				body: [
					'Before promoting a rollout from pilot to broader release, operators should verify health stability, exclusion quality, update timing, and alert routing behavior.',
				],
				code: `Deployment checklist

- Pilot devices healthy for 7 days
- Internal tooling verified against behavior engine
- Alert routing tested with a synthetic incident
- Quarantine restore flow validated
- Release channel pinned for the target cohort`,
			},
		],
	},
	policies: {
		slug: 'policies',
		title: 'Policies',
		description: 'Control exclusions, trust rules, folder protection, scan timing, and incident routing.',
		eyebrow: 'Customize',
		intro:
			'Policies determine how vedSecure behaves on each endpoint. Good policy design keeps the product strict where it matters and flexible where work would otherwise be interrupted.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'scope',
				title: 'Policy scope and assignment',
				body: [
					'Policies can be assigned to individuals, teams, device classes, or staged cohorts. This makes it possible to handle very different endpoint roles without duplicating an entire security model for each group.',
				],
				bullets: [
					'Executive policy',
					'Engineering policy',
					'Finance policy',
					'Shared workstation policy',
				],
			},
			{
				id: 'controls',
				title: 'What a policy can control',
				body: [
					'Each vedSecure policy can shape exclusions, release cadence, ransomware folder protection, response automation, notification routes, and scan depth.',
				],
				code: `{
  "realtimeProtection": true,
  "behaviorEngine": "balanced",
  "scanMode": "smart-background",
  "protectedFolders": ["Finance", "Contracts", "Backups"],
  "exclusions": ["C:\\\\BuildCache"],
  "autoQuarantine": true
}`,
			},
			{
				id: 'review',
				title: 'Policy review habits',
				body: [
					'Policies should be reviewed on a schedule, especially after internal tooling changes, department workflow changes, or new release-channel adoption. Unreviewed exclusions tend to become long-term risk debt.',
				],
			},
		],
	},
	scans: {
		slug: 'scans',
		title: 'Scan Profiles',
		description: 'Use quick, full, targeted, and smart background scans for different protection needs.',
		eyebrow: 'Customize',
		intro:
			'vedSecure uses multiple scan profiles because different moments require different amounts of depth, urgency, and performance sensitivity.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'profile-types',
				title: 'Profile types',
				body: [
					'Quick scans favor speed, full scans favor coverage, targeted scans favor accuracy on a specific surface, and background scans favor continuous protection with minimal disruption.',
				],
				bullets: [
					'Quick Scan for fast confidence checks',
					'Full Scan for deep endpoint review',
					'Targeted Scan for one directory or removable device',
					'Smart Background Scan for steady day-to-day coverage',
				],
			},
			{
				id: 'performance',
				title: 'Performance-aware scanning',
				body: [
					'Smart Background Scan adapts to device activity, helping protection continue during normal work while lowering pressure on CPU, storage, and battery-sensitive endpoints.',
				],
			},
			{
				id: 'scheduling',
				title: 'Scheduling strategy',
				body: [
					'Teams generally combine background scanning with occasional full scans on low-activity windows. That gives consistent coverage without turning every day into a maintenance event.',
				],
			},
		],
	},
	'release-channels': {
		slug: 'release-channels',
		title: 'Release Channels',
		description: 'Control how quickly new protections, engine logic, and behavioral updates move through the fleet.',
		eyebrow: 'Customize',
		intro:
			'Release channels are how vedSecure balances protection speed against operational confidence. Not every device should receive new behavior at the exact same time.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'channel-types',
				title: 'Stable, fast, and pilot',
				body: [
					'Stable is meant for most devices, fast is meant for teams comfortable validating changes earlier, and pilot is meant for a smaller test surface that helps catch workflow issues before wider rollout.',
				],
			},
			{
				id: 'promotion',
				title: 'Promote changes safely',
				body: [
					'The best release process is not only technical. It includes ownership, approval, and confirmation that internal software and recurring workflows remain healthy after a new engine update ships.',
				],
			},
			{
				id: 'signals',
				title: 'Signals to watch after an update',
				body: [
					'After a promotion, watch for new alert volume, CPU pressure, restore requests, device drift, and unusual exclusion requests. These are often the earliest signals of rollout friction.',
				],
			},
		],
	},
	'admin-console': {
		slug: 'admin-console',
		title: 'Admin Console',
		description: 'Use the vedSecure control plane for health, incidents, policies, updates, and review.',
		eyebrow: 'Layout',
		intro:
			'The vedSecure admin console is the workspace where policy, incident response, release control, and audit visibility come together. It is designed to support daily security operations, not just passive monitoring.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'panels',
				title: 'Core console panels',
				body: [
					'Operators typically move between the fleet overview, policy center, threat queue, and incident detail view. Those panels are arranged to reduce context switching during response.',
				],
				bullets: [
					'Fleet health overview',
					'Threat queue',
					'Policy management',
					'Release visibility',
					'Audit trail',
				],
			},
			{
				id: 'roles',
				title: 'Role-based visibility',
				body: [
					'The console supports different operator roles so security admins, analysts, observers, and IT support staff do not need the same depth of control or event visibility.',
				],
			},
			{
				id: 'workflows',
				title: 'Daily workflows',
				body: [
					'Most day-to-day workflows start with health review, move through threat triage, and end with policy or remediation changes. The console keeps these actions close together so operators can work through incidents quickly.',
				],
			},
		],
	},
	'fleet-management': {
		slug: 'fleet-management',
		title: 'Fleet Management',
		description: 'Group endpoints, monitor health, and keep policy and release state aligned across the fleet.',
		eyebrow: 'Layout',
		intro:
			'Fleet management is where vedSecure scales from a single endpoint tool into a real operations platform. Device grouping, health tracking, and release consistency are central to that shift.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'grouping',
				title: 'Group devices deliberately',
				body: [
					'Device grouping should reflect actual operational differences such as department, privilege level, trust profile, and software stack. Good grouping makes policy assignment predictable and alert review more meaningful.',
				],
			},
			{
				id: 'health',
				title: 'Watch for drift and stale endpoints',
				body: [
					'Unhealthy devices often become the blind spots that matter later. Fleet management surfaces stale agents, missed updates, long-offline endpoints, and policy mismatch so they can be fixed before an incident depends on them.',
				],
			},
			{
				id: 'cohorts',
				title: 'Operate in cohorts',
				body: [
					'Large fleets usually benefit from managing change in cohorts instead of in one broad motion. Cohorts are especially useful for policy experiments and release channel promotions.',
				],
			},
		],
	},
	'threat-timeline': {
		slug: 'threat-timeline',
		title: 'Threat Timeline',
		description: 'Use timeline views to understand how a threat entered, executed, spread, and was stopped.',
		eyebrow: 'Content',
		intro:
			'The threat timeline is how vedSecure turns raw detections into a readable incident story. It links process ancestry, file activity, user context, and response actions into one record.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'structure',
				title: 'What the timeline records',
				body: [
					'Timelines preserve execution order, actor relationships, affected artifacts, and operator intervention so a responder can reconstruct what happened without jumping between disconnected views.',
				],
				bullets: [
					'Initial entry point',
					'Parent-child process chain',
					'File and folder activity',
					'Quarantine or termination actions',
					'Follow-up scans and restore decisions',
				],
			},
			{
				id: 'analysis',
				title: 'Why timelines matter',
				body: [
					'A good timeline speeds up judgment. It reduces the gap between seeing a detection and understanding whether the event was contained, partial, repeated, or tied to larger endpoint compromise.',
				],
			},
		],
	},
	reports: {
		slug: 'reports',
		title: 'Reports',
		description: 'Generate fleet, policy, threat, and health reporting for security review and operations.',
		eyebrow: 'Content',
		intro:
			'Reports help vedSecure move from immediate response into trend visibility. They show which devices drift, which policies create noise, and which threat categories are increasing across the environment.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'report-types',
				title: 'Report types',
				body: [
					'Common report categories include device health, policy compliance, quarantine activity, threat volume, restore actions, and release adoption.',
				],
			},
			{
				id: 'operational-use',
				title: 'Use reports operationally',
				body: [
					'Reports are most useful when they trigger action. A good weekly report should surface which policies need review, which endpoints are unhealthy, and where operator time is being spent unnecessarily.',
				],
			},
		],
	},
	'enrollment-flows': {
		slug: 'enrollment-flows',
		title: 'Enrollment Flows',
		description: 'Understand how user onboarding and initial device registration behave across different rollout models.',
		eyebrow: 'Forms',
		intro:
			'Enrollment flows are the first user-facing part of vedSecure. They should be predictable, low-friction, and clear about what is happening to the device during initial protection setup.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'user-paths',
				title: 'Different enrollment paths',
				body: [
					'An executive-managed deployment, a self-serve install, and an engineering pilot all feel different. vedSecure documents these as separate enrollment patterns because the operator expectations are different.',
				],
			},
			{
				id: 'signals',
				title: 'What enrollment should confirm',
				body: [
					'Every successful enrollment should confirm identity, policy assignment, baseline health, release channel, and the first successful check-in to the admin plane.',
				],
			},
		],
	},
	'incident-intake': {
		slug: 'incident-intake',
		title: 'Incident Intake',
		description: 'Route suspicious events into a consistent human review flow with the right context attached.',
		eyebrow: 'Forms',
		intro:
			'Incident intake is how users, operators, and automated systems submit a suspicious event into a response workflow. Good intake reduces ambiguity and accelerates investigation quality.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'requirements',
				title: 'Minimum intake context',
				body: [
					'Useful intake includes the affected device, observed behavior, time window, local user context, and any visible application or file path involved in the event.',
				],
			},
			{
				id: 'triage',
				title: 'How intake becomes triage',
				body: [
					'Once an incident is accepted, vedSecure links intake context to device telemetry and existing detections so analysts can confirm whether they are seeing a new case or a duplicate of an already known incident.',
				],
			},
		],
	},
	'realtime-guard': {
		slug: 'realtime-guard',
		title: 'Realtime Guard',
		description: 'Inspect active endpoint behavior at the moment it happens and intervene before a chain completes.',
		eyebrow: 'Components',
		intro:
			'Realtime Guard is the endpoint-resident service responsible for immediate observation and first-line intervention. It is the foundation of vedSecure day-to-day protection.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'coverage',
				title: 'What Realtime Guard observes',
				body: [
					'File writes, process launches, script runners, startup changes, suspicious downloads, and memory-sensitive behavior are all part of the Realtime Guard observation surface.',
				],
			},
			{
				id: 'decisions',
				title: 'What Realtime Guard can do',
				body: [
					'Depending on policy, the service can block execution, terminate a suspicious chain, escalate the event, or pass the case to quarantine and deeper review.',
				],
			},
		],
	},
	'behavior-engine': {
		slug: 'behavior-engine',
		title: 'Behavior Engine',
		description: 'Score suspicious intent using chained activity rather than static matching alone.',
		eyebrow: 'Components',
		intro:
			'The Behavior Engine helps vedSecure catch threats that look ordinary in isolation but dangerous in sequence. It is built around intent, not only signatures.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'signals',
				title: 'Signal sources',
				body: [
					'Encoded commands, privilege escalation, staged download behavior, burst file modification, suspicious persistence creation, and tamper activity all contribute to behavior scoring.',
				],
			},
			{
				id: 'confidence',
				title: 'Why confidence matters',
				body: [
					'The engine is not only trying to classify danger. It is trying to classify how sure the platform should be and whether the right next action is block, observe, or escalate.',
				],
			},
		],
	},
	shield: {
		slug: 'shield',
		title: 'vedSecure Shield',
		description: 'Use the opinionated protection mode for stronger defaults and faster rollout.',
		eyebrow: 'Components',
		intro:
			'vedSecure Shield is the product mode for teams that want high-trust defaults and a simpler route to strong coverage. It is designed to reduce setup drag without reducing seriousness.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'defaults',
				title: 'Why Shield exists',
				body: [
					'Many teams want strong protection but do not want to manually tune every policy switch before they are safe. Shield provides an opinionated baseline that makes faster rollout possible.',
				],
			},
			{
				id: 'behavior',
				title: 'What changes in Shield mode',
				body: [
					'Shield tightens default protections, sharpens incident prioritization, and raises the consistency of folder protection, script monitoring, and severe alert handling.',
				],
			},
		],
	},
	'ransomware-barrier': {
		slug: 'ransomware-barrier',
		title: 'Ransomware Barrier',
		description: 'Detect and interrupt encryption-heavy behavior before damage spreads widely.',
		eyebrow: 'Components',
		intro:
			'Ransomware Barrier is the vedSecure subsystem built specifically around destructive storage behavior. It is not only looking for a known family name, but also for the practical mechanics of bulk damage.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'patterns',
				title: 'Patterns it watches',
				body: [
					'Rapid file rewrites, extension churn, protected-folder targeting, backup interference, and mass rename sequences are among the strongest indicators monitored by the barrier.',
				],
			},
			{
				id: 'containment',
				title: 'Containment model',
				body: [
					'When policy permits, vedSecure can halt the process chain, quarantine affected artifacts, and preserve enough timeline information for a later restore or incident review decision.',
				],
			},
		],
	},
	'quarantine-recovery': {
		slug: 'quarantine-recovery',
		title: 'Quarantine & Recovery',
		description: 'Contain artifacts safely, review their context, and restore with audit visibility when needed.',
		eyebrow: 'Helpers',
		intro:
			'Quarantine and recovery are designed as a controlled lifecycle. The point is not only to hide a file, but to give operators a safe place to make later trust decisions.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'quarantine',
				title: 'What quarantine preserves',
				body: [
					'Original file path, detection reason, parent process context, hash, operator decisions, and timestamped actions all stay associated with the artifact.',
				],
			},
			{
				id: 'restore',
				title: 'When recovery is appropriate',
				body: [
					'Restore is appropriate after validation, not as a reflex. The platform is designed to keep enough information attached to each artifact so a restore decision is reviewable later.',
				],
			},
		],
	},
	notifications: {
		slug: 'notifications',
		title: 'Notifications',
		description: 'Route detections and operational warnings to the right people without amplifying noise.',
		eyebrow: 'Helpers',
		intro:
			'Notifications are where security automation meets human attention. vedSecure treats them as policy outputs, not as one-size-fits-all messages.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'routing',
				title: 'Route alerts intentionally',
				body: [
					'High-severity detections should not route the same way as healthy-device reminders. vedSecure allows notification routing to differ by severity, team, device class, and incident type.',
				],
			},
			{
				id: 'noise',
				title: 'Reduce avoidable noise',
				body: [
					'The right notification model favors urgency and ownership. Too much low-value alerting erodes operator confidence and makes real incidents slower to recognize.',
				],
			},
		],
	},
	automation: {
		slug: 'automation',
		title: 'Automation',
		description: 'Use policy-driven automation for repeatable response and fleet hygiene workflows.',
		eyebrow: 'Utilities',
		intro:
			'Automation in vedSecure is meant to remove repetitive work without hiding what happened. Good automation leaves a readable trail and still preserves operator choice where it matters.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'actions',
				title: 'Automation actions',
				body: [
					'Common automated actions include quarantine, isolate, route for approval, rescan after restore, alert unhealthy devices, and notify on stale release state.',
				],
				bullets: [
					'Automatic quarantine',
					'Background rescans',
					'Device isolation triggers',
					'Recurring hygiene tasks',
				],
			},
			{
				id: 'guardrails',
				title: 'Automation guardrails',
				body: [
					'Guardrails matter because strong automation in the wrong place creates friction. vedSecure documents when to automate immediately and when to require operator confirmation.',
				],
			},
		],
	},
	integrations: {
		slug: 'integrations',
		title: 'Integrations',
		description: 'Connect vedSecure to external tooling for messaging, reporting, and downstream response.',
		eyebrow: 'Utilities',
		intro:
			'Integrations help vedSecure fit into broader operating environments. The goal is not only export, but reliable movement of the right context into the right follow-on systems.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'channels',
				title: 'Integration types',
				body: [
					'Webhook delivery, messaging routes, SIEM exports, provisioning workflows, and internal reporting pipelines are all common integration paths.',
				],
				bullets: [
					'Webhook events',
					'Email and chat delivery',
					'SIEM and SOAR pipelines',
					'Subscription and provisioning hooks',
				],
			},
			{
				id: 'design',
				title: 'Design integrations around ownership',
				body: [
					'Integrations are most effective when they preserve ownership. A threat event should land where someone can act on it, not simply where it is technically possible to send it.',
				],
			},
		],
	},
	'api-events': {
		slug: 'api-events',
		title: 'API Events',
		description: 'Understand the event and action model that powers automation and integration workflows.',
		eyebrow: 'Utilities',
		intro:
			'vedSecure event documentation gives operators a stable model for understanding what the product emits and which actions downstream systems can take safely.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'event-types',
				title: 'Representative event classes',
				body: [
					'Event classes include threat creation, quarantine state changes, device health drift, policy updates, scan completion, and isolation requests.',
				],
				code: `threat.created
threat.quarantined
device.offline
device.unhealthy
scan.completed
policy.updated`,
			},
			{
				id: 'actions',
				title: 'Action surfaces',
				body: [
					'Common action surfaces include policy assignment, host isolation, quarantine restore, and device grouping. These actions are generally governed by role and policy rather than only raw API access.',
				],
			},
		],
	},
	'github-pages': {
		slug: 'github-pages',
		title: 'GitHub Pages Docs',
		description: 'Use vedSecure documentation content as the basis for a public static docs portal.',
		eyebrow: 'Extend',
		intro:
			'The Bootstrap-style model works because it combines grouped navigation, clear hierarchy, and deep linking. vedSecure can use that same model for a public product knowledge base and static docs portal.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'structure',
				title: 'Recommended public docs structure',
				body: [
					'Public docs should be split into stable sections rather than left as one oversized page. That makes linking, search, and long-term maintenance much easier.',
				],
				code: `/docs
/docs/getting-started
/docs/protection-layers
/docs/policies
/docs/deployment
/docs/integrations
/docs/faq`,
			},
			{
				id: 'publishing',
				title: 'Publishing notes',
				body: [
					'If the docs are mirrored into a static site, keep anchor-based deep links, preserve category grouping, and separate operator-only material from public product education.',
				],
			},
		],
	},
	'public-docs': {
		slug: 'public-docs',
		title: 'Public Docs Strategy',
		description: 'Organize technical marketing, operator guidance, and static education content into a coherent docs program.',
		eyebrow: 'Extend',
		intro:
			'A public documentation strategy should distinguish between buyer education, operator reference, and deep technical product internals. vedSecure benefits when those layers are connected but not mixed carelessly.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'layers',
				title: 'Three useful documentation layers',
				body: [
					'Most product teams benefit from separating overview material, implementation guidance, and operational detail. That lets each audience find the right level of depth without being overwhelmed.',
				],
				bullets: [
					'Overview and positioning docs',
					'Implementation and setup docs',
					'Operational and workflow docs',
				],
			},
			{
				id: 'maintenance',
				title: 'Treat docs like product surface area',
				body: [
					'Good docs age like code: they need ownership, versioning, review, and release alignment. vedSecure documentation should grow alongside product behavior rather than lagging behind it.',
				],
			},
		],
	},
	'platform-overview': {
		slug: 'platform-overview',
		title: 'Platform Overview',
		description: 'Read the broader operating model behind the vedSecure platform and how its services fit together.',
		eyebrow: 'About',
		intro:
			'vedSecure is built as a layered endpoint protection platform with local action, central control, staged rollout, and readable response history. The platform model matters because it shapes how every feature behaves later.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'model',
				title: 'The operating model',
				body: [
					'The platform combines endpoint-native protection with central policy control and visibility. That means fast local action is possible without sacrificing audit quality or operator coordination.',
				],
			},
			{
				id: 'principles',
				title: 'Core principles',
				body: [
					'Fast intervention, readable incident context, policy-driven control, and staged operational change are the main design principles that appear across the product.',
				],
			},
		],
	},
	faq: {
		slug: 'faq',
		title: 'FAQ',
		description: 'Common questions about vedSecure behavior, rollout, and documentation structure.',
		eyebrow: 'About',
		intro:
			'This FAQ is a compact reference for recurring product, rollout, and docs questions that surface as teams expand vedSecure usage.',
		updated: 'April 15, 2026',
		sections: [
			{
				id: 'common',
				title: 'Common questions',
				body: [
					'vedSecure is built to work for both individuals and managed teams, to support staged rollout, and to preserve more context than a traditional single-engine antivirus tool.',
				],
				bullets: [
					'Can vedSecure support both individuals and companies? Yes.',
					'Can it stage new protection logic before wide rollout? Yes.',
					'Can docs be published publicly as a large reference portal? Yes.',
				],
			},
		],
	},
}

export const docsPageList = Object.values(docsPages)
