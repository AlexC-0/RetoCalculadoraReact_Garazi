interface Props {
  value: string
}

export default function Display({ value }: Props) {
  return (
    <div className="display" aria-label="Pantalla">
      {value}
    </div>
  )
}
