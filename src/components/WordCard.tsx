import { Word } from '../types'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import Draggable, { DraggableData, DraggableEventHandler } from 'react-draggable'
import { deleteWords } from '../api'

const WordCard = ({ word, refresh }: { word: Word, refresh?: () => void }) => {
  const [x, setX] = useState(0)
  const handleDrag: DraggableEventHandler = (_, data: DraggableData) => {
    if (data.deltaX > 0 && data.x >= 0) {
      setX(0)
      return false
    }
    if (data.x <= -80) {
      setX(-80)
      return false
    }
    setX(data.x)
  }
  const handleDragEnd: DraggableEventHandler = (_, data: DraggableData) => {
    if ((data.deltaX > 0 && data.x >= 0) || data.x > -40) {
      setX(0)
    }
    if (data.x < -40) {
      setX(-80)
    }
  }

  const handleDelete = async () => {
    if (confirm('remove it?')) {
      await deleteWords(word.id!)
      refresh?.()
    }
  }

  return (
    <div className="word-card-container group w-full bg-white rounded shadow relative h-20">
      <div onClick={handleDelete} className='active:bg-red-600 absolute rounded shadow right-0 top-0 bottom-0 w-20 bg-red-500 text-white p-2 flex'>
        <Icon icon="iconamoon:trash-thin" className='m-auto text-2xl' />
      </div>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        axis="x"
        handle=".word-card"
        scale={1}
        position={{ x, y: 0 }}
        onDrag={handleDrag}
        onStop={handleDragEnd}
      >
        <div className='transition-all group-has-[.react-draggable-dragging]:transition-none absolute rounded shadow right-0 top-0 bottom-0 left-0 bg-white p-4'>
          <div className='group/translation bg-white flex items-center'>
            <div className='flex-1 word-card'>
              <span className="text-lg">{word.word}</span>
              <p className="text-sm invisible group-has-[:checked]/translation:visible">{word.translation}</p>
            </div>
            <label htmlFor="showTranslation" className='ml-auto' onClick={() => setX(0)}>
              <input id="showTranslation" type="checkbox" className='hidden peer' />
              <Icon icon="bi:eye" className="text-2xl block peer-[:checked]:hidden" />
              <Icon icon="bi:eye-slash" className="text-2xl hidden peer-[:checked]:block" />
            </label>
          </div>
        </div>
      </Draggable>

    </div>
  )
}

export default WordCard
