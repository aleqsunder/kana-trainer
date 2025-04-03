export type ScriptType = 'hiragana' | 'katakana' | 'both'
export type InputSystem = 'romaji' | 'cyrillic' | 'both'

export interface SyllabaryEntry {
    hira: string
    kata: string
    romaji: string
    cyr: string
    column: string
    row: string
}
