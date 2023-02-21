import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // Show spinner after 500ms
    const timeout = setTimeout(() => {
      setShowSpinner(true);
    }, 500);

    // Clear timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col justify-center items-center">
      {showSpinner ? (
        <div className="w-24 h-24 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
      ) : null}
    </div>
  );
}
