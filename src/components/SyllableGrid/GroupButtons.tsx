import KanaStore from '@/stores/KanaStore'
import ExpandButton from '@/components/ExpandButton'

export const GroupButtons = () => {
	const {toggleColumns, clearSelection} = KanaStore

	const selectGojuuon = () => toggleColumns(KanaStore.gojuuonColumns)
	const selectDakuten = () => toggleColumns(KanaStore.dakutenColumns)
	const selectHandakuten = () => toggleColumns(KanaStore.handakutenColumns)
	const selectAll = () => toggleColumns(KanaStore.columns)
	const clearAll = () => clearSelection()

	return (
		<div className="btn__container">
			<ExpandButton onClick={selectGojuuon} className="btn--small">Годзюон (基本)</ExpandButton>
			<ExpandButton onClick={selectDakuten} className="btn--small">Дакутэн (濁音)</ExpandButton>
			<ExpandButton onClick={selectHandakuten} className="btn--small">Хандакутэн (半濁音)</ExpandButton>
			<div className="btn__delimeter"></div>
			<ExpandButton onClick={selectAll} className="btn--small btn--accent">Все</ExpandButton>
			<ExpandButton onClick={clearAll} className="btn--small btn--danger">Сбросить</ExpandButton>
		</div>
	)
}
