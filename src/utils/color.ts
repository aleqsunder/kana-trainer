import {KanaKeyboardRaceStatusType} from '@/types/kana'

export function getClassColor(status: KanaKeyboardRaceStatusType): string {
    switch (status) {
        case "success": return 'keyboard-race__item--success'
        case "error": return 'keyboard-race__item--error'
        case "default": return ''
    }
}
