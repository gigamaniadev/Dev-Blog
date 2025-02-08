import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Log the 404 error for monitoring
    console.error(`Page not found: ${router.asPath}`);
  }, [router.asPath]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link href="/">
        <a className="text-blue-500 hover:text-blue-700">Return to Home</a>
      </Link>
    </div>
  );
}
