import { decode, encode } from 'js-base64'
import type { Word } from '../types'

const user = import.meta.env.VITE_GITHUB_USER
const repo = import.meta.env.VITE_GITHUB_REPO
const token = import.meta.env.VITE_GITHUB_TOKEN

const getFile = async () => {
  const response = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/words.json`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${token}`
    }
  })
  return await response.json()
}

export const getWords = async () => {
  const words = await getFile()
  return JSON.parse(decode(words.content))
}

export const addWords = async (newWords: Array<Word>) => {
  const { content, sha } = await getFile()
  const oldWords = JSON.parse(decode(content))
  const formatNewWords = newWords.map((word, index) => {
    return {
      ...word,
      sentences: word.sentences || [],
      tags: word.tags || [],
      note: word.note || '',
      id: (oldWords[oldWords.length - 1]?.id || 0) + index + 1
    }
  })
  const words = formatNewWords.reduce<Word[]>((pre, cur) => {
    const haveWord = pre.find(word => word.word === cur.word)
    if (!haveWord) {
      return pre.concat(cur)
    }
    return pre.map(word => {
      if (word.word === cur.word) {
        return { ...cur, id: word.id }
      }
      return word
    })
  }, oldWords)

  const _content = encode(JSON.stringify(words))

  await fetch(`https://api.github.com/repos/${user}/${repo}/contents/words.json`, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      message: 'update words',
      content: _content,
      sha
    })
  })
}

export const deleteWords = async (id: number) => {
  const { content, sha } = await getFile()
  const oldWords = JSON.parse(decode(content))
  if (oldWords.find((word: Word) => word.id === id)) {
    const newWords = oldWords.filter((word: Word) => word.id !== id)
    const _content = encode(JSON.stringify(newWords))
    await fetch(`https://api.github.com/repos/${user}/${repo}/contents/words.json`, {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        message: 'update words',
        content: _content,
        sha
      })
    })
  }
}
