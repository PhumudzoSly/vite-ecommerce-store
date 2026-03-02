import * as React from "react";
import { useNavigate } from "react-router-dom";

interface AppLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
}

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ to, onClick, target, children, ...props }, ref) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        isModifiedEvent(event) ||
        (target && target !== "_self")
      ) {
        return;
      }

      event.preventDefault();
      navigate(to);
    };

    return (
      <a ref={ref} href={to} target={target} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  },
);

AppLink.displayName = "AppLink";
