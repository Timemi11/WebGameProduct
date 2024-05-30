import * as React from "react";
import { useState, useContext, FormEvent } from "react";
import { GetProfile } from "../App";
import { GameProduct } from "../type/items";

import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";
import { postGameProduct } from "../services/httpMethod";

export default function AdminCreate() {
  const [prod_img, setProdImg] = useState<string>("");
  const [prod_name, setProdName] = useState<string>("");
  const [prod_desc, setProdDesc] = useState<string>("");
  const [prod_price, setProdPrice] = useState<string>("");
  const dataLine = useContext<GameProduct | null>(GetProfile);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postGameProduct(
      dataLine,
      prod_img,
      prod_name,
      prod_desc,
      Number.parseInt(prod_price)
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        className="w-full h-screen pt-8 "
        style={{ backgroundColor: "#212233" }}>
        <Container
          className="bg-white"
          maxWidth="sm"
          sx={{ p: 6, overflow: "auto" }}>
          <Typography
            variant="h6"
            style={{ marginBottom: "30px", textAlign: "center" }}
            gutterBottom
            component={"div"}>
            เพิ่มสินค้า
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  id="prod_img"
                  label="GameProduct image"
                  variant="outlined"
                  fullWidth
                  required
                  value={prod_img}
                  onChange={(e) => setProdImg(e.target.value)}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_name"
                  label="GameProduct Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={prod_name}
                  onChange={(e) => setProdName(e.target.value)}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_desc"
                  label="GameProduct Desciption"
                  variant="outlined"
                  fullWidth
                  value={prod_desc}
                  onChange={(e) => setProdDesc(e.target.value)}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_price"
                  label="GameProduct Price"
                  variant="outlined"
                  type="number"
                  fullWidth
                  required
                  value={prod_price}
                  onChange={(e) => setProdPrice(e.target.value)}></TextField>
              </Grid>

              <Grid item xs={12}>
                <ButtonGroup
                  style={{ display: "flex", justifyContent: "space-between" }}
                  variant="outlined"
                  aria-label="Basic button group">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => (window.location.href = "/admin")}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setProdImg("");
                      setProdName("");
                      setProdDesc("");
                      setProdPrice("");
                    }}>
                    Clear
                  </Button>
                  <Button type="submit" variant="contained" color="success">
                    Create
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
}