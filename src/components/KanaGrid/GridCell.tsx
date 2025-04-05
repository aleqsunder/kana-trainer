import {listOfKana} from '@/data/listOfKana'
import {KanaDisplay} from '@/components/KanaGrid/KanaDisplay'

interface GridCellProps {
    column: string
    vowel: string
    selected: boolean
    onClick: (column: string) => void
    script: string
}

export const GridCell = ({column, vowel, selected, onClick, script}: GridCellProps) => {
    const kana = listOfKana.find(s => s.column === column && s.row === vowel)
    const className = `table-grid__cell ${selected ? 'column-selected' : ''}`

    return (
        <div className={className} onClick={() => onClick(column)}>
            {kana && <KanaDisplay kana={kana} script={script}/>}
        </div>
    )
}
