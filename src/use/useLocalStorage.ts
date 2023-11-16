import { computed } from 'vue'

const parseJSON = (value: string) => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch (error) {
    return undefined
  }
}

export function useLocalStorage<T>(key: string, initalValue: T) {
  const readVlue = () => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? parseJSON(value) : initalValue
    } catch (error) {
      return initalValue
    }
  }
  const storedVlue = computed(() => readVlue())
  const setVlue = (value: T) => {
    try {
      const newVaule = value instanceof Function ? value(storedVlue) : value
      window.localStorage.setItem(key, JSON.stringify(newVaule))
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key)
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }
  return {
    value: storedVlue,
    setVlue,
    removeItem,
  }
}
