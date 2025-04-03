import {syllabary} from '@/data/syllabary'
import {Syllable} from '@/components/SyllableGrid/Syllable'

interface GridCellProps {
	column: string
	vowel: string
	selected: boolean
	onClick: (column: string) => void
	script: string
}

export const GridCell = ({column, vowel, selected, onClick, script}: GridCellProps) => {
	const syllable = syllabary.find(s => s.column === column && s.row === vowel)
	const className = `table-grid__cell ${selected ? 'column-selected' : ''}`

	return (
		<div className={className} onClick={() => onClick(column)}>
			{syllable && <Syllable syllable={syllable} script={script}/>}
		</div>
	)
}
