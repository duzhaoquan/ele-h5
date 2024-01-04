export function createBEM(name: string) {
  return (el?: string, mods?: Record<string, boolean>) => {
    let result = `${name}${el ? `__${el}` : ''}`
    if (mods) {
      const mostStr = Object.keys(mods)
        .filter((mod) => mods[mod])
        .map((mod) => ` ${result}--${mod}`)
        .join('')
      result += mostStr
    }
    return result
  }
}

export function createNamespace(name: string) {
  const preName = `op-${name}`
  return [preName, createBEM(preName)] as const
}
