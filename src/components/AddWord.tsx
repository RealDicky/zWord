import { Icon } from '@iconify/react'
import { useState } from 'react'
import { addWords } from '../api'

const AddWord = ({ refresh }: {refresh?: () => void}) => {
  const [showAddWord, setShowAddWord] = useState(false)
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const handleAddWord = () => {
    setShowAddWord(true)
  }
  const handleCancel = () => {
    setShowAddWord(false)
    setWord('')
    setTranslation('')
  }
  const handleAdd = async () => {
    await addWords([{ word, translation }])
    setShowAddWord(false)
    setWord('')
    setTranslation('')
    refresh?.()
  }
  return <>
    <div onClick={handleAddWord} className='rounded-full w-10 h-10 border shadow-md flex'>
      <Icon icon="ph:plus" className='m-auto text-2xl' />
    </div>
    {
      showAddWord && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20'>
          <div className='fixed top-1/4 left-1/2 -translate-x-1/2 border px-10 pt-6 pb-5 rounded-lg shadow-md bg-white'>
            <label className='block' htmlFor="word">
              <input value={word} onChange={(e) => setWord(e.target.value)} type="text" id="word" name="word" className='border rounded-md p-2 focus:outline-none' placeholder="word" />
            </label>
            <label className='block mt-4' htmlFor="translation">
              <input value={translation} onChange={(e) => setTranslation(e.target.value)} type="text" id="translation" name="translation" className='border rounded-md p-2' placeholder="translation" />
            </label>
            <div className='flex'>
              <button className='w-full mt-4 bg-red-500 text-white rounded-md p-2' onClick={handleCancel}>Cancel</button>
              <button disabled={!word || !translation} className='w-full mt-4 bg-blue-500 text-white rounded-md p-2 ml-3 disabled:bg-gray-200' onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      )
    }

  </>
}

export default AddWord
