interface GridHeaderProps {
	column: string
	selected: boolean
	onClick: (column: string) => void
}

export const GridHeader = ({column, selected, onClick}: GridHeaderProps) => (
	<div onClick={() => column && onClick(column)}
		className={`table-grid__header ${selected ? 'selected' : ''}`}>
		{column || ''}
	</div>
)
