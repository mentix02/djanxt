"use client";

import { useState, createContext, PropsWithChildren } from "react";
import AddTaskDialog from "@/components/tasks/AddTaskDialog";

interface AddTaskProviderProps {
  open: boolean;
  onClose: () => void;
  showDialog: () => void;
}

export const AddTaskContext = createContext<AddTaskProviderProps | null>(null);

export default function AddTaskProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const showDialog = () => setOpen(true);

  return (
    <AddTaskContext.Provider value={{ open, onClose, showDialog }}>
      {children}
      <AddTaskDialog open={open} onClose={onClose} />
    </AddTaskContext.Provider>
  );
}
