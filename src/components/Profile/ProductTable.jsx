import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SortIcon from "@mui/icons-material/Sort";

const ProductTable = ({
  products,
  loading,
  onDeleteProduct,
  onUpdateProduct,
}) => {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSortProducts = () => {
    const sorted = [...products].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setSortedProducts(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleOpenUpdateForm = (product) => {
    setUpdatedProduct(product);
    setOpenUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleUpdateProduct = () => {
    onUpdateProduct(updatedProduct);
    handleCloseUpdateForm();
  };

  const trimDescription = (description) => {
    if (description.length > 100) {
      return description.substring(0, 100) + "...";
    }
    return description;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
        <Button
          variant="text"
          color="primary"
          startIcon={<SortIcon />}
          sx={{ textTransform: "unset" }}
          onClick={handleSortProducts}
        >
          Sort by Title ({sortDirection === "asc" ? "A-Z" : "Z-A"})
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              borderBottom: 2,
              backgroundColor: "#d5d5d5",
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>SNo.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography>No Products Found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {sortedProducts.length > 0
                  ? sortedProducts.map((product, index) => (
                      <TableRow
                        key={index}
                        sx={{ backgroundColor: index % 2 ? "#f5f5f5" : "fff" }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>
                          {product.image && (
                            <img
                              src={product.image}
                              alt="Product"
                              style={{ width: 50 }}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {trimDescription(product.description)}
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            onClick={() => handleOpenUpdateForm(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label="delete"
                            onClick={() => onDeleteProduct(product.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  : products.map((product, index) => (
                      <TableRow
                        key={index}
                        sx={{ backgroundColor: index % 2 ? "#f5f5f5" : "fff" }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>
                          {product.image && (
                            <img
                              src={product.image}
                              alt="Product"
                              style={{ width: 50 }}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {trimDescription(product.description)}
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            aria-label="edit"
                            onClick={() => handleOpenUpdateForm(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label="delete"
                            onClick={() => onDeleteProduct(product.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openUpdateForm} onClose={handleCloseUpdateForm}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            name="title"
            fullWidth
            value={updatedProduct.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            name="description"
            fullWidth
            value={updatedProduct.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            name="price"
            fullWidth
            value={updatedProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="category"
            label="Category"
            type="text"
            name="category"
            fullWidth
            value={updatedProduct.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            name="image"
            fullWidth
            value={updatedProduct.image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseUpdateForm}
            color="error"
            sx={{ textTransform: "unset" }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} sx={{ textTransform: "unset" }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductTable;
