import React, { ElementType } from "react";

interface FormattedTextProps {
  text: string;
  className?: string;
  as?: ElementType;
}

/**
 * Component that safely renders text with inline markdown bolding (**bold**)
 * into proper <strong> tags without displaying literal asterisks.
 */
export default function FormattedText({
  text,
  className = "",
  as: Tag = "span",
}: FormattedTextProps) {
  if (!text) return null;

  // Split by ** delimiters
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <Tag className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldText = part.slice(2, -2);
          return (
            <strong key={index} className="font-bold text-[var(--cream)]">
              {boldText}
            </strong>
          );
        }
        return part;
      })}
    </Tag>
  );
}
