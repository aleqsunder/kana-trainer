import {makeAutoObservable} from "mobx"
import {syllabary} from "@/data/syllabary"
import {ScriptType, InputSystem, SyllabaryEntry} from "@/types/kana"

const STORAGE_KEY = "kanaTrainerSettings"

class KanaStore {
	script: ScriptType = "hiragana"
	inputSystem: InputSystem = "romaji"
	selectedColumns: string[] = []
	currentSyllable: SyllabaryEntry | null = null
	previousSyllables: SyllabaryEntry[] = []
	history = new Map<string, number>()
	inputValue = ""

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
			if (data.selectedColumns) {
				this.selectedColumns = data.selectedColumns
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
			selectedColumns: this.selectedColumns,
			history: Object.fromEntries(this.history)
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

	get filteredSyllables(): SyllabaryEntry[] {
		if (this.selectedColumns.length === 0) {
			return syllabary
		}

		return syllabary.filter(s => this.selectedColumns.includes(s.column))
	}

	generateNewSyllable = () => {
		if (this.filteredSyllables.length === 0) {
			return
		}

		const syllableStats = this.filteredSyllables.map(syllable => ({
			syllable,
			count: this.history.get(this.getHistoryKey(syllable)) || 0
		}))

		const minCount = Math.min(...syllableStats.map(s => s.count))
		const rarestSyllables = syllableStats
			.filter(s => s.count === minCount)
			.map(s => s.syllable)

		this.currentSyllable = rarestSyllables[
			Math.floor(Math.random() * rarestSyllables.length)
		]
	}

	checkAnswer = () => {
		if (!this.currentSyllable) {
			return false
		}

		const validAnswers = []
		if (this.inputSystem !== "cyrillic") {
			validAnswers.push(this.currentSyllable.romaji)
		}
		if (this.inputSystem !== "romaji") {
			validAnswers.push(this.currentSyllable.cyr)
		}

		const isCorrect = validAnswers.includes(this.inputValue.trim().toLowerCase())

		if (isCorrect) {
			const key = this.getHistoryKey(this.currentSyllable)
			const count = this.history.get(key) || 0
			this.history.set(key, count + 1)
			this.inputValue = ""
			this.saveToLocalStorage()
		}

		return isCorrect
	}

	private getHistoryKey = (syllable: SyllabaryEntry): string => {
		return syllable.romaji
	}

	addPreviousSyllable() {
		if (this.currentSyllable) {
			this.previousSyllables = [
				this.currentSyllable,
				...this.previousSyllables
			].slice(0, 2)
		}
	}

	setInputValue = (value: string) => {
		this.inputValue = value
	}

	clearHistory = () => {
		this.history.clear()
		this.saveToLocalStorage()
	}
}

export default new KanaStore()
