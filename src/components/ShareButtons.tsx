import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link2, X } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [showMobileShare, setShowMobileShare] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#1DA1F2] hover:bg-[#1a8cd8]",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#4267B2] hover:bg-[#365899]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0077B5] hover:bg-[#006399]",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      setShowMobileShare(false);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Try to use the native share API on mobile if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setShowMobileShare(true);
        }
      }
    } else {
      setShowMobileShare(true);
    }
  };

  return (
    <>
      {/* Desktop share buttons */}
      <div className="z-50 hidden lg:flex flex-col items-center space-y-4 fixed left-8 top-1/2 -translate-y-1/2">
        <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg">
          <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex flex-col items-center space-y-2">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full text-white transition-all duration-200 ${link.color} hover:scale-110`}
              title={`Share on ${link.name}`}
            >
              {link.icon}
            </a>
          ))}

          <button
            onClick={copyToClipboard}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200 hover:scale-110"
            title="Copy link"
          >
            <Link2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile share button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={handleNativeShare}
          className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Share2 className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile share menu */}
      {showMobileShare && (
        <div className="lg:hidden fixed inset-0 bg-gray-900/50 z-50 flex items-end">
          <div className="w-full bg-white dark:bg-gray-800 rounded-t-2xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Share this article
              </h3>
              <button
                onClick={() => setShowMobileShare(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2"
                  onClick={() => setShowMobileShare(false)}
                >
                  <div
                    className={`p-3 rounded-full text-white ${
                      link.color.split(" ")[0]
                    }`}
                  >
                    {link.icon}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {link.name}
                  </span>
                </a>
              ))}
              <button
                onClick={copyToClipboard}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-3 rounded-full text-white bg-gray-600">
                  <Link2 className="h-5 w-5" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Copy Link
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
