import { useState, useEffect, useRef, useCallback } from 'react'

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  // Função de debounce com tipagem correta
  const debounce = useCallback((fn: () => void, delay: number) => {
    let timer: NodeJS.Timeout | null = null
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }, [])

  useEffect(() => {
    const handleResize = debounce(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
      }
    }, 100) // 100ms de debounce

    const resizeObserver = new ResizeObserver(handleResize)

    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [debounce])

  return { ref, width }
}

export default useContainerWidth
