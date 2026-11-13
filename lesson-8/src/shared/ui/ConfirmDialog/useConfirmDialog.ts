import { useState } from 'react';

export interface ConfirmDialogOptions {
  title: string;
  description: string;
}

interface DialogState extends ConfirmDialogOptions {
  resolve: (confirmed: boolean) => void;
}

export const useConfirmDialog = () => {
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const showConfirmDialog = (options: ConfirmDialogOptions) =>
    new Promise<boolean>((resolve) => {
      setDialog({ ...options, resolve });
    });

  const closeDialog = (confirmed: boolean) => {
    dialog?.resolve(confirmed);
    setDialog(null);
  };

  return {
    showConfirmDialog,
    dialogProps: dialog
      ? {
          title: dialog.title,
          description: dialog.description,
          onClose: closeDialog,
        }
      : null,
  };
};
