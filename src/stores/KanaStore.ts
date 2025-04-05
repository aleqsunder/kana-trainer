import {makeAutoObservable} from "mobx"
import {ScriptType, InputSystem, KanaEntry, RandomType} from "@/types/kana"
import KanaService from '@/services/KanaService'

const STORAGE_KEY = "kanaTrainerSettings"

class KanaStore {
    script: ScriptType = "hiragana"
    inputSystem: InputSystem = "romaji"
    selectedColumns: string[] = []
    history: Map<string, number> = new Map<string, number>()
    randomType: RandomType = "rarest"

    enteredKanaPerSession: number = 0
    enteredKanaForAllTime: number = 0

    gojuuonColumns = ['', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w']
    dakutenColumns = ['g', 'z', 'd', 'b']
    handakutenColumns = ['p']

    columns = [...this.gojuuonColumns, ...this.dakutenColumns, ...this.handakutenColumns]
    rows = ['a', 'i', 'u', 'e', 'o', '']

    constructor() {
        makeAutoObservable(this)
        this.loadFromLocalStorage()

        window.addEventListener("beforeunload", this.saveToLocalStorage)
    }

    private loadFromLocalStorage = () => {
        const savedData = localStorage.getItem(STORAGE_KEY)
        if (!savedData) {
            return
        }

        try {
            const data = JSON.parse(savedData)

            if (data.script) {
                this.script = data.script
            }
            if (data.inputSystem) {
                this.inputSystem = data.inputSystem
            }
            if (data.randomType) {
                this.randomType = data.randomType
            }
            if (data.selectedColumns) {
                this.selectedColumns = data.selectedColumns
            }
            if (data.enteredKanaForAllTime) {
                this.enteredKanaForAllTime = data.enteredKanaForAllTime
            }

            if (data.history) {
                this.history = new Map(Object.entries(data.history))
            }
        } catch (e) {
            console.error("Ошибка загрузки из localStorage:", e)
        }
    }

    private saveToLocalStorage = () => {
        const data = {
            script: this.script,
            inputSystem: this.inputSystem,
            randomType: this.randomType,
            selectedColumns: this.selectedColumns,
            history: Object.fromEntries(this.history),
            enteredKanaForAllTime: this.enteredKanaForAllTime,
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }

    setScript = (script: ScriptType) => {
        this.script = script
        this.saveToLocalStorage()
    }

    setInputSystem = (system: InputSystem) => {
        this.inputSystem = system
        this.saveToLocalStorage()
    }

    setRandomType = (type: RandomType) => {
        this.randomType = type
        this.saveToLocalStorage()
    }

    toggleColumn = (column: string) => {
        this.selectedColumns = this.selectedColumns.includes(column)
            ? this.selectedColumns.filter(c => c !== column)
            : [...this.selectedColumns, column]

        this.saveToLocalStorage()
    }

    toggleColumns = (columns: string[]) => {
        const allNewColumnsSelected = columns.every(col =>
            this.selectedColumns.includes(col)
        )

        this.selectedColumns = allNewColumnsSelected
            ? this.selectedColumns.filter(c => !columns.includes(c))
            : [...new Set([...this.selectedColumns, ...columns])]

        this.saveToLocalStorage()
    }

    clearSelection = () => {
        this.selectedColumns = []
        this.saveToLocalStorage()
    }

    updateHistory(kana: KanaEntry): void {
        if (!kana) {
            return
        }

        const key = KanaService.getHistoryKey(kana)
        const count = this.history.get(key) || 0

        this.history.set(key, count + 1)
        this.enteredKanaPerSession++
        this.enteredKanaForAllTime++

        this.saveToLocalStorage()
    }
}

export default new KanaStore()
