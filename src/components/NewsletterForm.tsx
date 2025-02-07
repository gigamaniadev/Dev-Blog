import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, PartyPopper } from 'lucide-react';
import { subscribeToNewsletter } from '../lib/subscriptions';
import { Modal } from './Modal';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      await subscribeToNewsletter(email);
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      setShowSuccessModal(true);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
          {status !== 'idle' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {status === 'loading' && (
                <Loader2 className="h-5 w-5 text-blue-200 animate-spin" />
              )}
              {status === 'success' && (
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              )}
              {status === 'error' && (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
        >
          {status === 'loading' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : status === 'success' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <>
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
        {status === 'error' && message && (
          <div className="text-sm text-red-400 absolute mt-2">
            {message}
          </div>
        )}
      </form>

      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <PartyPopper className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              Successfully Subscribed!
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thank you for subscribing to our newsletter. You'll be the first to know about our latest articles and updates!
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setShowSuccessModal(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}