import Button from './Button'

type Op = '+' | '-' | '×' | '÷'

interface Props {
  onDigit: (d: string) => void
  onDot: () => void
  onOperation: (op: Op) => void
  onClear: () => void
  onClearLast: () => void
  onEqual: () => void
}

export default function Keypad({
  onDigit,
  onDot,
  onOperation,
  onClear,
  onClearLast,
  onEqual
}: Props) {
  return (
    <div className="keypad">
      <Button label="1" onClick={() => onDigit('1')} />
      <Button label="2" onClick={() => onDigit('2')} />
      <Button label="3" onClick={() => onDigit('3')} />
      <Button label="+" className="op" onClick={() => onOperation('+')} />

      <Button label="4" onClick={() => onDigit('4')} />
      <Button label="5" onClick={() => onDigit('5')} />
      <Button label="6" onClick={() => onDigit('6')} />
      <Button label="-" className="op" onClick={() => onOperation('-')} />

      <Button label="7" onClick={() => onDigit('7')} />
      <Button label="8" onClick={() => onDigit('8')} />
      <Button label="9" onClick={() => onDigit('9')} />
      <Button label="×" className="op" onClick={() => onOperation('×')} />

      <Button label="0" className="wide" onClick={() => onDigit('0')} />
      <Button label="." onClick={onDot} />
      <Button label="÷" className="op" onClick={() => onOperation('÷')} />

      <Button label="DEL" className="danger" onClick={onClearLast} />
      <Button label="C" className="danger" onClick={onClear} />
      <Button label="=" className="equal" onClick={onEqual} />
    </div>
  )
}
