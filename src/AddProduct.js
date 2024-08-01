import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { call } from "./ApiService";

const AddProduct = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    title: "",
    author: "",
    publisher: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    call("/book", "POST", product).then(() => {
      onProductAdded();
      setProduct({ title: "", author: "", publisher: "", userId: "" });
    });
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <TextField
          name="title"
          label="Title"
          value={product.title}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          name="author"
          label="Author"
          value={product.author}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          name="publisher"
          label="Publisher"
          value={product.publisher}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          name="userId"
          label="User ID"
          value={product.userId}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2E3B55", color: "#FFFFFF" }}
          onClick={handleAddProduct}
        >
          BOOK 추가
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddProduct;
