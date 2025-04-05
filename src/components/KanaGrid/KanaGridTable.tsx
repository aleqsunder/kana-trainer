import {observer} from 'mobx-react-lite'
import KanaStore from '@/stores/KanaStore'
import {GridHeader} from '@/components/KanaGrid/GridHeader'
import {GridCell} from '@/components/KanaGrid/GridCell'
import {GroupButtons} from '@/components/KanaGrid/GroupButtons'

const KanaGridTable = observer(() => {
    const {script, selectedColumns, toggleColumn} = KanaStore

    return (
        <div className="table-grid__container">
            <div className="group-selection">
                <label className="group-selection__label">Быстрый выбор групп каны</label>
                <div className="group-selection__subtext">
                    Вы можете выбрать нужные вам столбцы для изучения, <b>нажав</b> на них<br/>
                    Так же вы можете быстро выбрать нужную группу кан, нажав на соответствующие кнопки ниже<br/>
                    Годзюон — базовые каны, Дакутэн — звонкие, Хандакутэн — полузвонкие
                </div>

                <GroupButtons/>
            </div>

            <div className="table-grid" role="grid">
                <div className="table-grid__headers">
                    <div key="grid-corner" className="table-grid__corner"/>
                    {KanaStore.columns.map((col, i) => (
                        <GridHeader key={`header-${col}-${i}`} column={col}
                            selected={selectedColumns.includes(col)} onClick={toggleColumn}/>
                    ))}
                </div>

                <div className="table-grid__rows">
                    {KanaStore.rows.map((row, i) => (
                        <div key={`row-${i}`} className="table-grid__row">
                            <div className="table-grid__vowel-header">{row}</div>
                            {KanaStore.columns.map((col, j) => (
                                <GridCell key={`cell-${j}-${i}`} column={col} vowel={row}
                                    selected={selectedColumns.includes(col)} onClick={toggleColumn}
                                    script={script}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default KanaGridTable
