import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/Products";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
  Chip,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {products.length === 0 ? (
            <Box sx={{ mt: 3, pl: 3 }}>Sorry, No products found!</Box>
          ) : (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    mt: 2,
                    mb: 2,

                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderBottom: 4,
                    borderBottomColor: "cornflowerblue",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      mt: 2,
                      objectFit: "contain",
                    }}
                    src={product.image}
                    alt={product.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {product.title.length > 50
                        ? product.title.substring(0, 47) + "..."
                        : product.title}
                    </Typography>
                    <Typography variant="caption" sx={{ mb: 1, mt: 1 }}>
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        mr: 2,
                      }}
                    >
                      <Chip
                        label={`Rs. ${product.price}`}
                        color="error"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={product.category}
                        sx={{ mr: 1 }}
                        color="success"
                      />
                      <Chip
                        label={product.rating.rate}
                        sx={{ mr: 1 }}
                        color="warning"
                      />
                    </Box>
                  </CardContent>
                  <Button fullWidth sx={{ textTransform: "unset", mt: -4 }}>
                    <ShoppingCartIcon />
                    Add To Cart
                  </Button>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;
