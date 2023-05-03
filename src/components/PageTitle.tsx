export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="sm:text-6xl text-4xl max-w-2xl mt-8 font-bold text-slate-900">
      {title}
    </h1>
  )
}
