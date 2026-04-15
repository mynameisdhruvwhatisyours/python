import { type FeatureLookupProps } from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import CrossTerm from '@/assets/cross-team.svg'
import Initiative from '@/assets/initiative.svg'
import Insight from '@/assets/insight.svg'
import Milestone from '@/assets/milestone.svg'
import { TabHeaders } from './components/wide-card/tab-header'

export const longTermFeatureLookup: FeatureLookupProps[] = [
	{
		id: 'long-term-feature-1',
		title: 'Protection plans',
		description: 'Coordinate strategic security rollouts.',
		icon: <Initiative />,
	},
	{
		id: 'long-term-feature-2',
		title: 'Cross-team coverage',
		description: 'Coordinate security across teams and departments.',
		icon: <CrossTerm />,
	},
	{
		id: 'long-term-feature-3',
		title: 'Milestones',
		description: 'Break protection rollouts down into clear phases.',
		icon: <Milestone />,
	},
	{
		id: 'long-term-feature-4',
		title: 'Threat insights',
		description: 'Track coverage, response speed, and protection over time.',
		icon: <Insight />,
	},
]

export const tabHeaders: TabHeaders[] = [
	{
		id: 'tab-header-1',
		title: 'Security playbooks',
	},
	{
		id: 'tab-header-2',
		title: 'Inline reviews',
	},
	{
		id: 'tab-header-3',
		title: 'Text-to-alert actions',
	},
]
