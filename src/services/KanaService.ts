import {KanaEntry, KanaKeyboardRaceEntry} from '@/types/kana'
import KanaStore from '@/stores/KanaStore'
import {listOfKana} from '@/data/listOfKana'

class KanaService {
    checkAnswer(kana: KanaEntry, inputValue: string = '') {
        if (!kana) {
            return false
        }

        const validAnswers = []
        if (KanaStore.inputSystem !== "cyrillic") {
            validAnswers.push(kana.romaji)
        }
        if (KanaStore.inputSystem !== "romaji") {
            validAnswers.push(kana.cyr)
        }

        console.log(kana, validAnswers, inputValue.trim().toLowerCase())
        return validAnswers.includes(inputValue.trim().toLowerCase())
    }

    generateRandomKana(): KanaEntry {
        return this.filteredKanaList[Math.floor(Math.random() * this.filteredKanaList.length)]
    }

    getHistoryKey(kana: KanaEntry): string {
        return kana.romaji
    }

    generateListOfKana(count: number = 50): KanaKeyboardRaceEntry[] {
        if (this.filteredKanaList.length === 0) {
            return []
        }

        const kanaList: KanaKeyboardRaceEntry[] = []
        for (let i: number = 0; i < count; i++) {
            const kana: KanaEntry = this.generateRandomKana()
            const displayedKana: string = KanaStore.script === 'both'
                ? Math.floor(Math.random() * 2) === 1 ? kana.hira : kana.kata
                : KanaStore.script === 'hiragana' ? kana.hira : kana.kata

            kanaList.push({
                ...kana,
                displayedKana,
                status: 'default',
            })
        }

        return kanaList
    }

    generateRandomRarestKanaList(): KanaEntry {
        const kanaListStats = this.filteredKanaList.map(kana => ({
            kana,
            count: KanaStore.history.get(this.getHistoryKey(kana)) || 0
        }))

        const minCount: number = Math.min(...kanaListStats.map(s => s.count))
        const rarestKanaList: KanaEntry[] = kanaListStats
            .filter(s => s.count === minCount)
            .map(s => s.kana)

        return rarestKanaList[Math.floor(Math.random() * rarestKanaList.length)]
    }

    generateRandomKanaExtendType(): KanaEntry {
        if (KanaStore.randomType === 'rarest') {
            return this.generateRandomRarestKanaList()
        }

        return this.generateRandomKana()
    }

    get filteredKanaList(): KanaEntry[] {
        if (KanaStore.selectedColumns.length === 0) {
            return listOfKana
        }

        return listOfKana.filter(s => KanaStore.selectedColumns.includes(s.column))
    }
}

export default new KanaService()
