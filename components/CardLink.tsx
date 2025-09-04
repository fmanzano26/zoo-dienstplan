import Link from 'next/link'

export default function CardLink({ href, title, desc }:{
  href: string, title: string, desc: string
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-zoo-border bg-zoo-card p-7 md:p-8 card-hover min-h-[112px]"
    >
      <div className="text-base font-semibold mb-2">{title}</div>
      <div className="text-sm opacity-80">{desc}</div>
    </Link>
  )
}
