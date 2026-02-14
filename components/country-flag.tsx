import Image from "next/image"

interface CountryFlagProps {
  code: string
  size?: number
  className?: string
}

export function CountryFlag({ code, size = 24, className = "" }: CountryFlagProps) {
  return (
    <Image
      src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
      alt={code.toUpperCase()}
      width={size}
      height={Math.round(size * 0.75)}
      className={`inline-block rounded-sm object-cover ${className}`}
      unoptimized
    />
  )
}
