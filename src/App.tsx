import { useCallback, useEffect, useState } from 'react'
import './styles.css'

import Display from './components/Display'
import Keypad from './components/Keypad'

type Operacion = '+' | '-' | '×' | '÷' | null

export default function App() {
  const [display, setDisplay] = useState<string>('0')
  const [primerNumero, setPrimerNumero] = useState<number | null>(null)
  const [operacion, setOperacion] = useState<Operacion>(null)
  const [esperandoSegundo, setEsperandoSegundo] = useState<boolean>(false)

  const escribirDigito = useCallback((d: string) => {
    if (esperandoSegundo) {
      setDisplay(d)
      setEsperandoSegundo(false)
      return
    }

    if (display === '0') {
      setDisplay(d)
    } else {
      setDisplay(display + d)
    }
  }, [display, esperandoSegundo])

  const escribirPunto = useCallback(() => {
    if (esperandoSegundo) {
      setDisplay('0.')
      setEsperandoSegundo(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }, [display, esperandoSegundo])

  const limpiar = useCallback(() => {
    setDisplay('0')
    setPrimerNumero(null)
    setOperacion(null)
    setEsperandoSegundo(false)
  }, [])

  const borrarUltimo = useCallback(() => {
    if (esperandoSegundo) return

    if (display.length === 1) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }, [display, esperandoSegundo])

  const calcular = (a: number, b: number, op: Exclude<Operacion, null>) => {
    if (op === '+') return a + b
    if (op === '-') return a - b
    if (op === '×') return a * b
    return a / b
  }

  const elegirOperacion = useCallback((op: Exclude<Operacion, null>) => {
    const actual = Number(display)

    if (primerNumero === null) {
      setPrimerNumero(actual)
      setOperacion(op)
      setEsperandoSegundo(true)
      return
    }

    if (operacion && !esperandoSegundo) {
      const resultado = calcular(primerNumero, actual, operacion)
      setDisplay(String(resultado))
      setPrimerNumero(resultado)
      setOperacion(op)
      setEsperandoSegundo(true)
      return
    }

    setOperacion(op)
    setEsperandoSegundo(true)
  }, [display, operacion, esperandoSegundo, primerNumero])

  const igual = useCallback(() => {
    if (primerNumero === null || operacion === null) return

    const segundo = Number(display)
    const resultado = calcular(primerNumero, segundo, operacion)

    setDisplay(Number.isFinite(resultado) ? String(resultado) : 'Error')
    setPrimerNumero(null)
    setOperacion(null)
    setEsperandoSegundo(false)
  }, [display, operacion, primerNumero])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key

      if (key >= '0' && key <= '9') {
        escribirDigito(key)
        return
      }

      if (key === '.') {
        escribirPunto()
        return
      }

      if (key === '+') {
        elegirOperacion('+')
        return
      }

      if (key === '-') {
        elegirOperacion('-')
        return
      }

      if (key === '*' || key.toLowerCase() === 'x') {
        elegirOperacion('×')
        return
      }

      if (key === '/') {
        elegirOperacion('÷')
        return
      }

      if (key === 'Enter' || key === '=') {
        igual()
        return
      }

      if (key === 'Backspace') {
        borrarUltimo()
        return
      }

      if (key === 'Escape') {
        limpiar()
        return
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [borrarUltimo, elegirOperacion, escribirDigito, escribirPunto, igual, limpiar])

  return (
    <main className="app">
      <h1 className="title">Calculadora</h1>

      <section className="calculator">
        <Display value={display} />

        <Keypad
          onDigit={escribirDigito}
          onDot={escribirPunto}
          onOperation={elegirOperacion}
          onClearLast={borrarUltimo}
          onClear={limpiar}
          onEqual={igual}
        />
      </section>
    </main>
  )
}
