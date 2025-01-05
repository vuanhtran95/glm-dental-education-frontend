import React, { useState, useRef, useEffect } from "react";

const ClickableTooltip: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Toggle tooltip visibility
  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  // Close tooltip when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        className="text-white text-sm active:outline-none hover:border-none focus:outline-none focus-visible:outline-none bg-gray-800"
        onClick={() => toggleTooltip()}
      >
        Scenario
        <i className="pl-2 fa-solid fa-circle-info"></i>
      </button>

      {/* Tooltip */}
      {isVisible && (
        <div className="absolute left-[-60px] z-10 w-72 p-2 text-sm text-white bg-gray-600 rounded-xl shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default ClickableTooltip;
