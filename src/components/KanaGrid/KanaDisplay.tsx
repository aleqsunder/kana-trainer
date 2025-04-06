import {KanaEntry} from '@/types/kana'

interface KanaDisplayProps {
    kana: KanaEntry | undefined
    script: string
}

export const KanaDisplay = ({kana, script}: KanaDisplayProps) => {
    if (!kana) {
        return null
    }

    if (script === 'both') {
        return (
            <div className="kana-container">
                <span className="hiragana-character">{kana.hira}</span>
                <span className="katakana-character">{kana.kata}</span>
            </div>
        )
    }

    return (
        <>
            {script === 'hiragana' && <span className="hiragana-character">{kana.hira}</span>}
            {script === 'katakana' && <span className="katakana-character">{kana.kata}</span>}
        </>
    )
}
