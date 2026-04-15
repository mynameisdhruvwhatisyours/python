'use client'

import { useEffect, useState, type FC } from 'react'
import GridCell from './grid-cell'
import styles from './styles.module.css'

const layers = [
	['Perplexity', 'Supercell', 'Watershed', 'Raycast', 'Netlify', 'together.ai'],
	['Netlify', 'Perplexity', 'together.ai', 'Supercell', 'Watershed', 'Raycast'],
	['Watershed', 'Raycast', 'Perplexity', 'together.ai', 'Supercell', 'Netlify'],
]

const NameMark = ({ name }: { name: string }) => (
	<span className={styles.name__mark}>{name}</span>
)

const CustomerList: FC = () => {
	const [layer, setLayer] = useState<number>(1)

	useEffect(() => {
		const changeLayer = () => setLayer((prev) => (prev % 3) + 1)
		const interval = setInterval(changeLayer, 3000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={styles.customer__grid}>
			<div className={styles.logo__grid}>
				<GridCell
					layer={layer}
					icon1={<NameMark name={layers[0][0]} />}
					icon2={<NameMark name={layers[1][0]} />}
					icon3={<NameMark name={layers[2][0]} />}
				/>
				<GridCell
					layer={layer}
					icon1={<NameMark name={layers[0][1]} />}
					icon2={<NameMark name={layers[1][1]} />}
					icon3={<NameMark name={layers[2][1]} />}
				/>
				<GridCell
					layer={layer}
					icon1={<NameMark name={layers[0][2]} />}
					icon2={<NameMark name={layers[1][2]} />}
					icon3={<NameMark name={layers[2][2]} />}
				/>
				<GridCell
					layer={layer}
					icon1={<NameMark name={layers[0][3]} />}
					icon2={<NameMark name={layers[1][3]} />}
					icon3={<NameMark name={layers[2][3]} />}
				/>
				<GridCell
					layer={layer}
					icon1={<NameMark name={layers[0][4]} />}
					icon2={<NameMark name={layers[1][4]} />}
					icon3={<NameMark name={layers[2][4]} />}
				/>
				<GridCell
					layer={layer}
					icon1={<NameMark name={layers[0][5]} />}
					icon2={<NameMark name={layers[1][5]} />}
					icon3={<NameMark name={layers[2][5]} />}
				/>
			</div>
		</div>
	)
}

export default CustomerList
