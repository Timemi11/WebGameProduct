import React, { FormEvent, useContext, useState, useEffect } from 'react';
import { GetProfile } from '../App';
import { User } from './Model/User';
import { useParams } from 'react-router-dom';
import { ngrokDomain } from '../Component/pathngrok/ngrokdomain';
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  ButtonGroup,
} from '@mui/material';

export default function ProductUpdate() {
  const [prod_img, setProdImg] = useState<string>('');
  const [prod_name, setProdName] = useState<string>('');
  const [prod_desc, setProdDesc] = useState<string>('');
  const [prod_price, setProdPrice] = useState<string>('');
  const dataLine = useContext<User | undefined>(GetProfile);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(ngrokDomain+'products/' + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //ในคลิปมี key status แต่ api ใน mongo ไม่ได้ทำเอาไว้

        setProdImg(result['prod_img']);
        setProdName(result['prod_name']);
        setProdDesc(result['prod_desc']);
        setProdPrice(result['prod_price']);
      })
      .catch((error: Error) => console.error(error));
  }, [id]); //ดึงข้อมูลจาก Id ที่ส่งมาจาก หน้าแรก แค่รอบเดียว และ get ค่าอีกครั้งเมื่อ Id เปลี่ยนค่า

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //ป้องกันการ refresh หน้าเว็บเมื่อ submit
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      pictureUrl: dataLine?.pictureUrl,
      userId: dataLine?.userId,
      displayName: dataLine?.displayName,
      statusMessage: dataLine?.statusMessage,
      prod_img: prod_img,
      prod_name: prod_name,
      prod_desc: prod_desc,
      prod_price: prod_price,
    });

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(ngrokDomain+'/products/' + id, requestOptions)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        alert('แก้ไขข้อมูล Product แล้ว T0T');
      })
      .catch((error: Error) => console.error(error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        className="w-full h-screen pt-8"
        style={{ backgroundColor: '#c8c6c6' }}
      >
        <Container
          className="bg-white"
          maxWidth="sm"
          sx={{ p: 6, overflow: 'auto' }}
        >
          <Typography variant="h6" gutterBottom component={'div'}>
            Update Products
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="prod_img"
                  label="Product Image"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setProdImg(e.target.value)}
                  value={prod_img}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_name"
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setProdName(e.target.value)}
                  value={prod_name}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_desc"
                  label="Product Desciption"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setProdDesc(e.target.value)}
                  value={prod_desc}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_price"
                  label="Product Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setProdPrice(e.target.value)}
                  value={prod_price}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  variant="outlined"
                  aria-label="Basic button group"
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => (window.location.href = '/admin')}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setProdImg('');
                      setProdName('');
                      setProdDesc('');
                      setProdPrice('');
                    }}
                  >
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
