import React, { FormEvent, useContext, useState, useEffect } from "react";
import { GetProfile } from "../App";
import { GameProduct } from "../type/items";
import { useParams } from "react-router-dom";

import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  ButtonGroup,
} from "@mui/material";
import { getGameProductId, putGameProduct } from "../services/httpMethod";

export default function AdminEdit() {
  const [prod_img, setProdImg] = useState<string>("");
  const [prod_name, setProdName] = useState<string>("");
  const [prod_desc, setProdDesc] = useState<string>("");
  const [prod_price, setProdPrice] = useState<string>("");
  const dataLine = useContext<GameProduct | null>(GetProfile);
  const { id } = useParams<{ id: string | undefined }>();

  async function get(id: string | undefined) {
    const data = await getGameProductId(id);
    setProdImg(data["prod_img"]);
    setProdName(data["prod_name"]);
    setProdDesc(data["prod_desc"]);
    setProdPrice(data["prod_price"]);
  }

  useEffect(() => {
    get(id);
  }, [id]); //ดึงข้อมูลจาก Id ที่ส่งมาจาก หน้าแรก แค่รอบเดียว และ get ค่าอีกครั้งเมื่อ Id เปลี่ยนค่า

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //ป้องกันการ refresh หน้าเว็บเมื่อ submit
    putGameProduct(
      dataLine,
      prod_img,
      prod_name,
      prod_desc,
      Number.parseInt(prod_price),
      id
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        className="w-full h-screen pt-8"
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
            แก้ไขสินค้า
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  id="prod_img"
                  label="GameProduct Image"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setProdImg(e.target.value)}
                  value={prod_img}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_name"
                  label="GameProduct Name"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setProdName(e.target.value)}
                  value={prod_name}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_desc"
                  label="GameProduct Desciption"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setProdDesc(e.target.value)}
                  value={prod_desc}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_price"
                  label="GameProduct Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setProdPrice(e.target.value)}
                  value={prod_price}></TextField>
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
                    Update
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