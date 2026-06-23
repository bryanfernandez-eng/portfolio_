function PaginationDots({ total, activeIndex, onSelect }) {
  return (
    <div className="flex justify-center gap-2 mt-8 px-4 md:px-16 lg:px-24">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to page ${i + 1}`}
          className="transition-all duration-300"
          style={{
            width: activeIndex === i ? '24px' : '8px',
            height: '8px',
            borderRadius: '2px',
            background: activeIndex === i ? '#212121' : '#ccc',
          }}
        />
      ))}
    </div>
  )
}

export default PaginationDots
