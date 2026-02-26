"use client";

import { useState } from "react";

export default function FeedbackWidget() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setFeedback("");
  };

  return (
    <div className="mt-10">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block font-medium">
            Was this page helpful?
          </label>

          <textarea
            data-testid="feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your feedback..."
            rows={3}
            className="w-full border rounded p-2"
          />

          <button
            type="submit"
            data-testid="feedback-submit"
            className="border px-4 py-1 rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <div
          data-testid="feedback-success-message"
          className="text-green-600 font-medium"
        >
          Thank you for your feedback! 🙌
        </div>
      )}
    </div>
  );
}
