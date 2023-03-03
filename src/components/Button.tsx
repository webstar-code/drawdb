import { LOADING, LOADINGWHITE } from "../assets";

interface Props {
  text: string,
  onClick?: () => void,
  type?: "primary" | "outlined" | "text"
  disabled?: boolean
  loading?: boolean
  size?: "xs" | "sm" | "md" | "lg",
  block?: boolean,
  className?: string
}

export function Button({
  text,
  type = "primary",
  disabled = false,
  loading = false,
  onClick,
  block,
  size = "md",
  className
}: Props) {
  const width = block ? "w-full" : "w-max";
  const height = size === "xs" ? "h-8" : size === "sm" ? "h-9" : size === "md" ? "h-10" : size === "lg" ? "h-12" : "h-10"

  if (type === "primary") {
    return (
      <button disabled={disabled} onClick={() => onClick && onClick()}
        className={`${width} ${height} px-4 text-sm font-semibold rounded-md text-center bg-primary text-white border border-primary cursor-pointer transition-all ${disabled ? "opacity-70" : "opacity-100"} ${className}`}
      >
        {loading ? <img src={LOADINGWHITE} alt="loader" className=" h-6 fill-white text-white" /> : text}
      </button>
    )
  }

  if (type === "outlined") {
    return (
      <button disabled={disabled} onClick={() => onClick && onClick()}
        className={`${width} ${height} ${className} px-4 text-sm font-semibold rounded-md text-center bg-transparent border-primary text-primary border cursor-pointer transition-all ${disabled ? "opacity-70" : "opacity-100"} `}
      >
        {loading ? <img src={LOADING} alt="loader" className=" h-6 fill-white text-white" /> : text}
      </button>
    )
  }

  return (
    <button disabled={disabled} onClick={() => onClick && onClick()}
      className={`${block ? "w-full" : "w-max text-primary"} ${disabled ? "opacity-70" : "opacity-100"} ${className} `}
    >
      {loading ? <img src={LOADING} alt="loader" className=" h-6 fill-white text-white flex items-center justify-center" /> : text}
    </button>
  )
}