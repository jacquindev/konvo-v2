import { useState } from "react";

export function useContactPanel() {
  const [openPanel, setOpenPanel] = useState(false);

  const togglePanel = () => {
    if (openPanel) {
      setOpenPanel(false);
    } else {
      setOpenPanel(true);
    }
  };

  return {
    openPanel,
    setOpenPanel,
    togglePanel,
  };
}
