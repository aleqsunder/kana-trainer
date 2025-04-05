import {KanaEntry} from '@/types/kana'

interface KanaDisplayProps {
    kana: KanaEntry | undefined
    script: string
}

export const KanaDisplay = ({kana, script}: KanaDisplayProps) => {
    if (!kana) {
        return null
    }

    const showHiragana = script === 'hiragana' || script === 'both'
    const showKatakana = script === 'katakana' || script === 'both'

    return (
        <div className="kana-container">
            {showHiragana && <span className="hiragana-character">{kana.hira}</span>}
            {showKatakana && <span className="katakana-character">{kana.kata}</span>}
        </div>
    )
}
