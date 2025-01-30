import { Dialog as MUIDialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ReactNode } from 'react';

type DialogProps = {
  open: boolean;
  onClose: (action: string, saleId: string) => void;
  title: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // ou outro tipo que represente as larguras possíveis
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
}: DialogProps) {
  return (
    <MUIDialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogCloseButton onClick={() => onClose('', '')} />
      <DialogContent>{children}</DialogContent>
    </MUIDialog>
  );
}

type DialogCloseButtonProps = {
  onClick: () => void;
}

function DialogCloseButton({ onClick }: DialogCloseButtonProps) {
  return (
    <IconButton
      aria-label="close"
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <Close />
    </IconButton>
  );
}
