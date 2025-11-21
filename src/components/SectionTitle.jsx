export default function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`w-24 h-1 bg-gradient-to-r from-desert-500 to-sand-500 mt-6 ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}
