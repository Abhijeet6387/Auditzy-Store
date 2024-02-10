import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
const AddProductDialog = ({
  openAddProductDialog,
  handleCloseAddProductDialog,
  handleAddProduct,
  handleInputChange,
  newProduct,
}) => {
  return (
    <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          name="title"
          fullWidth
          value={newProduct.title}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          name="description"
          fullWidth
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="number"
          name="price"
          fullWidth
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="category"
          label="Category"
          type="text"
          name="category"
          fullWidth
          value={newProduct.category}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="image"
          label="Image URL"
          type="text"
          name="image"
          fullWidth
          value={newProduct.image}
          onChange={handleInputChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAddProductDialog}
          color="error"
          sx={{ textTransform: "unset" }}
        >
          Cancel
        </Button>
        <Button onClick={handleAddProduct} sx={{ textTransform: "unset" }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
