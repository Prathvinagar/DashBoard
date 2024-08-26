import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

const CustomModal = ({
  title,
  isModalOpen,
  newWidget,
  buttonText1,
  buttonText2,
  handleModalClose,
  handleInputChange,
  handleAddWidget
}) => {
  return (
    <Dialog open={isModalOpen} onClose={handleModalClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          name="title"
          value={newWidget?.title}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Text"
          type="text"
          fullWidth
          name="text"
          value={newWidget?.text}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>{buttonText1}</Button>
        <Button onClick={handleAddWidget} variant="contained" color="primary">
          {buttonText2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
