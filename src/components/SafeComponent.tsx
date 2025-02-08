import React from "react";
import { sanitizeInput } from "../middleware/security";
import { isString } from "../utils/typeGuards";

interface SafeComponentProps {
  content: unknown;
  fallback?: React.ReactNode;
}

export const SafeComponent: React.FC<SafeComponentProps> = ({
  content,
  fallback = null,
}) => {
  if (!isString(content)) {
    return <>{fallback}</>;
  }

  const sanitizedContent = sanitizeInput(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
