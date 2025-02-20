'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="p-6">
      <h2 className="text-red-600 mb-4">Something went wrong!</h2>
      <button
        className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
