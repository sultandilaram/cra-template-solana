import React from 'react'

export default function useLocalStorage(key: string, defaultValue: any) {
  const [value, setValueState] = React.useState(() => {
    try {
      const item = localStorage.getItem(key)

      if (item) {
        return JSON.parse(item)
      } else {
        localStorage.setItem(key, JSON.stringify(item))
        return defaultValue
      }

    } catch (e) {
      console.error(e)
      return defaultValue
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
