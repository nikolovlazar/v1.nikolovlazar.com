import { createContext, PropsWithChildren, useState } from "react";

import { searchItems, SearchItemsType } from "@/data/cmd-palette";

type CmdPaletteType = {
  isOpened: boolean;
  focusedIndex: number;
  open: () => void;
  close: () => void;
  setFocusedIndex: (index: number) => void;
  commands: SearchItemsType;
  filterCommands: (query: string) => void;
};

export const CmdPaletteContext = createContext<CmdPaletteType>({
  isOpened: false,
  focusedIndex: 0,
  open: () => {},
  close: () => {},
  setFocusedIndex: () => {},
  commands: {
    pages: [],
    social: [],
    theme: [],
  },
  filterCommands: () => {},
});

const CmdPaletteProvider = ({ children }: PropsWithChildren<{}>) => {
  const [commands, setCommands] = useState(searchItems);
  const [isOpened, setIsOpened] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const open = () => {
    setIsOpened(true);
    setCommands(searchItems);
    setFocusedIndex(0);
  };

  const close = () => {
    setIsOpened(false);
  };

  const filterCommands = (query: string) => {
    setCommands({
      pages: searchItems.pages.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      ),
      social: searchItems.social.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      ),
      theme: searchItems.theme.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      ),
    });
  };

  return (
    <CmdPaletteContext.Provider
      value={{
        isOpened,
        focusedIndex,
        open,
        close,
        setFocusedIndex,
        commands,
        filterCommands,
      }}
    >
      {children}
    </CmdPaletteContext.Provider>
  );
};

export default CmdPaletteProvider;
