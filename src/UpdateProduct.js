import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { call } from "./ApiService";

const UpdateProduct = ({ product, onProductUpdated }) => {
  const initialProductState = {
    title: "",
    author: "",
    publisher: "",
    userId: "",
  };

  const [updatedProduct, setUpdatedProduct] = useState(initialProductState);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        title: product.title || "",
        author: product.author || "",
        publisher: product.publisher || "",
        userId: product.userId || "",
      });
    } else {
      setUpdatedProduct(initialProductState);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = () => {
    call(`/book/${product.id}`, "PUT", updatedProduct).then(() => {
      onProductUpdated();
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          name="title"
          label="Title"
          value={updatedProduct.title}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          name="author"
          label="Author"
          value={updatedProduct.author}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          name="publisher"
          label="Publisher"
          value={updatedProduct.publisher}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          name="userId"
          label="User ID"
          value={updatedProduct.userId}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProduct}
        >
          수정 완료
        </Button>
      </Grid>
    </Grid>
  );
};

export default UpdateProduct;
