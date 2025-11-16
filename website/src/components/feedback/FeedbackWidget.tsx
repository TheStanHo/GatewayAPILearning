'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, MessageSquare, X } from 'lucide-react'

interface FeedbackWidgetProps {
  pageSlug?: string
  pageTitle?: string
}

export function FeedbackWidget({ pageSlug, pageTitle }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type)
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    // In a real implementation, this would send to an API
    const feedbackData = {
      pageSlug,
      pageTitle,
      feedback,
      comment,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }

    // Store in localStorage for demo (in production, send to API)
    const existing = localStorage.getItem('feedback') || '[]'
    const feedbacks = JSON.parse(existing)
    feedbacks.push(feedbackData)
    localStorage.setItem('feedback', JSON.stringify(feedbacks))

    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setFeedback(null)
      setComment('')
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">
          Was this helpful?
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFeedback('positive')}
            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
            aria-label="Yes, this was helpful"
            title="Yes, this was helpful"
          >
            <ThumbsUp className="w-5 h-5 text-gray-600 hover:text-green-600" />
          </button>
          <button
            onClick={() => handleFeedback('negative')}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="No, this was not helpful"
            title="No, this was not helpful"
          >
            <ThumbsDown className="w-5 h-5 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {submitted ? 'Thank you!' : 'Share your feedback'}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-700">
                    Your feedback has been recorded. Thank you!
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    {feedback === 'positive'
                      ? 'What did you find most helpful?'
                      : 'What could we improve?'}
                  </p>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your feedback (optional)..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Submit Feedback
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

