import CardLink from '@/components/CardLink'
import { t } from '@/lib/i18n'

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const lang = (searchParams?.lang === 'es' ? 'es' : 'de') as 'de' | 'es'
  const tr = t(lang)

  return (
    <div className="pt-16">
      <h1 className="text-center text-5xl sm:text-6xl md:text-7xl font-extrabold text-zoo-cyan neon-title mb-16 md:mb-24">
        Zoo Club
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto">
        <CardLink
          href={`/staff?lang=${lang}`}
          title={tr.staff_card_title}
          desc={tr.staff_card_desc}
        />
        <CardLink
          href={`/manager?lang=${lang}`}
          title={tr.manager_card_title}
          desc={tr.manager_card_desc}
        />
      </div>

      {/* Texto más pequeño y sutil */}
      <p className="text-center opacity-60 mt-20 md:mt-28 text-xs">
        {tr.created_by}
      </p>
    </div>
  )
}

