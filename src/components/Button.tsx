interface Props {
  label: string
  className?: string
  onClick: () => void
}

export default function Button({ label, className = "", onClick }: Props) {
  return (
    <button
      className={`btn ${className}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
