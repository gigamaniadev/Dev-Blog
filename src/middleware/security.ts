import { NextApiResponse } from "next";
import sanitize from "isomorphic-dompurify";

export function securityMiddleware(res: NextApiResponse, next: () => void) {
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  next();
}

// Utility function to sanitize user input
export function sanitizeInput(input: string): string {
  return sanitize.sanitize(input);
}
