import { useEffect } from "react";

export function useOnClickOutside({ buttonRef, dropdownRef, handler }) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if there is a button and if clicking button ref's element or descenden elements
        if (!buttonRef.current || buttonRef.current.contains(event.target)) {
          return;
        }
        // If you don't want the dropdown to close when clicked, assign the dropdown ref to the dropdown component.
        if (dropdownRef && (!dropdownRef.current || dropdownRef.current.contains(event.target))) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [buttonRef, dropdownRef, handler]
  );
}
