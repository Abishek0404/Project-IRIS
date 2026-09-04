import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import * as React from "react";

export interface GetStartedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export function GetStartedButton({
  text = "Send Message",
  type = "submit",
  className = "",
  ...props
}: GetStartedButtonProps) {
  return (
    <Button
      type={type}
      className={`group relative overflow-hidden rounded-full font-semibold transition-all duration-300 w-full h-12 bg-white text-black hover:bg-white/95 shadow-md ${className}`}
      size="lg"
      {...props}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {text}
      </span>
      <i className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full z-10 grid w-11 place-items-center transition-all duration-500 bg-black/10 group-hover:w-[calc(100%-0.75rem)] group-active:scale-95 text-black not-italic">
        <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
      </i>
    </Button>
  );
}
