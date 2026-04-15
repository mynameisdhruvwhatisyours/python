import { type FeatureLookupProps } from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import Views from '@/assets/views.svg'
import WorkFlow from '@/assets/workflow.svg'
import Sla from '@/assets/sla.svg'
import Filter from '@/assets/filter.svg'

export const issueTrackingFeatureLookup: FeatureLookupProps[] = [
	{
		id: 'issue-tracking-feature-1',
		title: 'Tailored workflows',
		description: 'Track detections across custom response flows for your team.',
		icon: <WorkFlow />,
	},
	{
		id: 'issue-tracking-feature-2',
		title: 'Custom views',
		description:
			'Switch between list and board. Group alerts by priority, device, or team.',
		icon: <Views />,
	},
	{
		id: 'issue-tracking-feature-3',
		title: 'Filters',
		description: 'Refine alert lists down to what is most relevant to you.',
		icon: <Filter />,
	},
	{
		id: 'issue-tracking-feature-4',
		title: 'Response SLAs',
		description: 'Automatically apply deadlines to time-sensitive incidents.',
		icon: <Sla />,
	},
]
