import React, { useState, useEffect } from "react";
import { Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import AddProduct from "./AddProduct";
import SearchProduct from "./SearchProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import { call, signout } from "./ApiService";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  const fetchProducts = () => {
    call("/book", "GET")
      .then((response) => {
        console.log("Fetch products response:", response);
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
  };

  const handleProductFound = (product) => {
    setSelectedProduct(product);
    setActiveComponent("update");
  };

  const handleProductUpdated = () => {
    fetchProducts();
    setSelectedProduct(null);
    setActiveComponent(null); // 수정 완료 후 activeComponent 초기화
  };

  const handleProductDeleted = () => {
    console.log("Product deletion triggered");
    fetchProducts();
    setSelectedProduct(null);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "add":
        return <AddProduct onProductAdded={handleProductAdded} />;
      case "update":
        return (
          <UpdateProduct
            product={selectedProduct}
            onProductUpdated={handleProductUpdated}
          />
        );
      case "search":
        return <SearchProduct onProductFound={handleProductFound} />;
      case "delete":
        return (
          <DeleteProduct
            onProductDeleted={handleProductDeleted}
            selectedProduct={selectedProduct}
          />
        );
      default:
        return null;
    }
  };

  let navigationBar = (
    <AppBar position="static" style={{ backgroundColor: "#2E3B55" }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="h6"
              style={{ color: "#FFD700", fontWeight: "bold" }}
            >
              교보문고
            </Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <Grid container spacing={1} direction="column" alignItems="center">
      {navigationBar}
      <Grid item xs={12}>
        <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
          교보문고 책 시스템
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => setActiveComponent("add")} startIcon="➕">
          추가
        </Button>
        <Button onClick={() => setActiveComponent("update")} startIcon="✏️">
          수정
        </Button>
        <Button onClick={() => setActiveComponent("search")} startIcon="🔍">
          검색
        </Button>
        <Button onClick={() => setActiveComponent("delete")} startIcon="🗑️">
          삭제
        </Button>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 20 }}>
        {renderActiveComponent()}
      </Grid>
      <Grid item xs={12} style={{ marginTop: 20 }}>
        <Typography variant="h6">책 목록</Typography>
        {products.length > 0 ? (
          <table style={{ marginTop: 20, border: "1px solid #ccc" }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.author}</td>
                  <td>{product.publisher}</td>
                  <td>{product.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography>책을 등록해주세요</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
