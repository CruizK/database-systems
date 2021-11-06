import { Dialog, DialogTitle } from "@mui/material";

function CreateModal({ open, onClose, title, size, children }) {

  return (
    <Dialog open={open} onClose={onClose} maxWidth={size}>
      <DialogTitle>
        {title}
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export default CreateModal;