"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Increments on every open() call — useful as a React key to force remount */
  modalKey: number;
};

const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  modalKey: 0,
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const open = useCallback(() => {
    setModalKey((k) => k + 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, open, close, modalKey }),
    [isOpen, open, close, modalKey]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export const useModal = () => useContext(ModalContext);