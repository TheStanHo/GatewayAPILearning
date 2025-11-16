import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'

interface AlertProps {
  type?: 'info' | 'warning' | 'tip' | 'important'
  title?: string
  children: React.ReactNode
}

export function Alert({ type = 'info', title, children }: AlertProps) {
  const styles = {
    info: {
      border: 'border-blue-500',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      icon: Info,
      defaultTitle: 'Info',
    },
    warning: {
      border: 'border-amber-500',
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      icon: AlertTriangle,
      defaultTitle: 'Warning',
    },
    tip: {
      border: 'border-green-500',
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      icon: Lightbulb,
      defaultTitle: 'Tip',
    },
    important: {
      border: 'border-red-500',
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      icon: AlertCircle,
      defaultTitle: 'Important',
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`${style.bg} ${style.border} border-l-4 rounded-lg p-3 md:p-4 my-4 md:my-6 shadow-sm`}>
      <div className="flex items-start gap-3">
        <div className={`${style.iconBg} ${style.iconColor} rounded-full p-1.5 flex-shrink-0 mt-0.5`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`text-sm font-semibold mb-2 ${type === 'important' ? 'text-red-900' : type === 'warning' ? 'text-amber-900' : type === 'tip' ? 'text-green-900' : 'text-blue-900'}`}>
              {title}
            </h3>
          )}
          <div className="text-sm text-gray-700 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ul]:ml-4 [&>ul]:list-disc [&>ul]:space-y-1 [&>strong]:font-semibold [&>a]:text-blue-700 [&>a]:underline [&>a:hover]:text-blue-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

