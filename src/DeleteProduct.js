import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { call } from "./ApiService";

const DeleteProduct = ({ onProductDeleted, selectedProduct }) => {
  const [title, setTitle] = useState(
    selectedProduct ? selectedProduct.title : ""
  );

  const handleDeleteProduct = () => {
    if (!selectedProduct) {
      console.error("No product selected for deletion");
      return;
    }

    const { id } = selectedProduct;

    call(`/book/${id}`, "DELETE")
      .then((response) => {
        console.log("Delete response:", response.data);
        onProductDeleted(); // 삭제 후 목록 다시 불러오기
        setTitle(""); // 제품 정보 초기화
      })
      .catch((error) => {
        console.error("Delete failed", error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteProduct}
        >
          BOOK 삭제
        </Button>
      </Grid>
    </Grid>
  );
};

export default DeleteProduct;
