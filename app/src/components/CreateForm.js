import { Button, DialogActions, DialogContent } from "@mui/material";


function CreateForm({ onSubmit, onCancel, children }) {


  return (
    <form onSubmit={onSubmit}>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  )
}

export default CreateForm;