export function createBEM(name: string) {
  return (el?: string, mods?: Record<string, boolean>) => {
    const result = `${name}${el ? `__${el}` : ''}`
    if (mods) {
      Object.keys(mods)
        .filter((mod) => {
          mods[mod]
        })
        .map((mod) => {
          ;` ${result}--${mod}`
        })
        .join('')
    }
    return result
  }
}

export function createNamespaceDQ(name: string) {
  const preName = `op-${name}`
  return [preName, createBEM(preName)] as const
}
