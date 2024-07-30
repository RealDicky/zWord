export interface Sentence {
  name: string
  translation: string
}

export interface Word {
  word: string
  translation: string
  sentences?: Sentence[]
  tags?: string[]
  note?: string
  id?: number
}
