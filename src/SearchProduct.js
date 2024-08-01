import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { call } from "./ApiService";

const SearchProduct = () => {
  const [title, setTitle] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchProduct = () => {
    call(`/book?title=${title}`, "GET")
      .then((response) => {
        const products = response.data;
        if (products && products.length > 0) {
          const product = products[0];
          setSearchedProduct(product);
          setErrorMessage("");
        } else {
          setSearchedProduct(null);
          setErrorMessage("Product not found");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
        setSearchedProduct(null);
        setErrorMessage("Failed to fetch product");
      });
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2E3B55", color: "#FFFFFF" }}
          onClick={handleSearchProduct}
        >
          BOOK 검색
        </Button>
      </Grid>
      {searchedProduct && (
        <Grid item xs={12}>
          <Typography variant="h6">검색 결과</Typography>
          <Typography>
            Title: {searchedProduct.title}
            <br />
            Author: {searchedProduct.author}
            <br />
            Publisher: {searchedProduct.publisher}
            <br />
            User ID: {searchedProduct.userId}
          </Typography>
        </Grid>
      )}
      {errorMessage && (
        <Grid item xs={12}>
          <Typography color="error">{errorMessage}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default SearchProduct;
