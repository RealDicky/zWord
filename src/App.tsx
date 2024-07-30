import { useEffect, useState } from 'react'
import './App.css'
import { getWords, addWords, deleteWords } from './api'

function App () {
  const [words, setWords] = useState([])
  const getWordsAsync = async () => {
    const words = await getWords()
    setWords(words)
  }
  const addWordsAsync = async () => {
    await addWords([{
      word: 'hello',
      translation: '你好'
    }])
  }

  const deleteWordsAsync = async () => {
    await deleteWords(1)
  }
  useEffect(() => {
    getWordsAsync()
  }, [])
  return (
    <>
      zword
      <button onClick={() => addWordsAsync()}>add</button>
      <button onClick={() => deleteWordsAsync()}>delete</button>
    </>
  )
}

export default App
