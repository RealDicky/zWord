import { useEffect, useState } from 'react'
import './App.css'
import { getWords } from './api'
import WordCard from './components/WordCard'
import { Word } from './types'
import AddWord from './components/AddWord'

function App () {
  const [words, setWords] = useState([])
  const getWordsAsync = async () => {
    const words = await getWords()
    setWords(words)
  }
  useEffect(() => {
    getWordsAsync()
  }, [])
  return (
    <>
      {words.map((word: Word) => (
        <div key={word.id} className='mx-2 my-2'>
          <WordCard word={word} refresh={getWordsAsync} />
        </div>
      ))}
      <div className='fixed bottom-10 right-10'>
        <AddWord refresh={getWordsAsync} />
      </div>
    </>
  )
}

export default App
