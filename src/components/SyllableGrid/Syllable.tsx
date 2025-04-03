import {SyllabaryEntry} from '@/types/kana'

interface SyllableProps {
	syllable: SyllabaryEntry | undefined
	script: string
}

export const Syllable = ({syllable, script}: SyllableProps) => {
	if (!syllable) {
		return null
	}

	const showHiragana = script === 'hiragana' || script === 'both'
	const showKatakana = script === 'katakana' || script === 'both'

	return (
		<div className="syllable-container">
			{showHiragana && <span className="hiragana-character">{syllable.hira}</span>}
			{showKatakana && <span className="katakana-character">{syllable.kata}</span>}
		</div>
	)
}
