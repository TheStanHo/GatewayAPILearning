interface DifficultyBadgeProps {
  level: 'beginner' | 'intermediate' | 'advanced'
  className?: string
}

export function DifficultyBadge({ level, className = '' }: DifficultyBadgeProps) {
  const colorClasses = {
    beginner: 'bg-[#d1fae5] text-[#047857] border-[#10b981]',
    intermediate: 'bg-[#fef3c7] text-[#b45309] border-[#f59e0b]',
    advanced: 'bg-[#fee2e2] text-[#b91c1c] border-[#ef4444]',
  }

  const labels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        border-2 ${colorClasses[level]} ${className}
      `}
    >
      {labels[level]}
    </span>
  )
}

