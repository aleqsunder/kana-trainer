export type ScriptType = 'hiragana' | 'katakana' | 'both'
export type InputSystem = 'romaji' | 'cyrillic' | 'both'

export interface KanaEntry {
    hira: string
    kata: string
    romaji: string
    cyr: string
    column: string
    row: string
}

export type KanaKeyboardRaceStatusType = 'success' | 'error' | 'default'

export interface KanaKeyboardRaceEntry extends KanaEntry {
    displayedKana: string,
    status: KanaKeyboardRaceStatusType,
}

export type RandomType = 'rarest' | 'default'
