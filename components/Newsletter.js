import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage("Thanks for subscribing! You'll receive new posts in your inbox.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-8">
      <h3 className="text-lg font-bold mb-2">Subscribe to my newsletter</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Get notified when I publish new posts about AI, growth, and building products. No spam, unsubscribe anytime.
      </p>

      {status === 'success' ? (
        <p className="text-green-600 dark:text-green-400 font-medium">{message}</p>
      ) : (
        <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                       font-medium rounded-md hover:bg-gray-700 dark:hover:bg-gray-300
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                       disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{message}</p>}
    </div>
  );
}
