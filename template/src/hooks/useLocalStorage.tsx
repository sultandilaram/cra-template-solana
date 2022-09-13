import React from 'react'

export default function useLocalStorage<T = any>(key: string, initialState: T extends Function ? never : (T | (() => T))): [T, (value: T) => void] {
  const [value, setValueState] = React.useState<T>(() => {
    try {
      const item = localStorage.getItem(key)

      if (item && item !== "null") {
        console.log(item, "item")
        return JSON.parse(item)
      } else {
        const defaultValue = typeof initialState === 'function' ? initialState() : initialState
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      }

    } catch (e) {
      console.error(e)
      return typeof initialState === 'function' ? initialState() : initialState
    }
  })

  const setValue = (value: any) => {
    setValueState(value)
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }

  return [value, setValue]
}
