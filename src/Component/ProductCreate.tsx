import * as React from 'react';
import { useState, useEffect, useContext, FormEvent } from 'react';
import liff from '@line/liff';
import { GetProfile } from '../App';
import { User } from './Model/User';
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

export default function ProductCreate() {
  const [prod_img, setProdImg] = useState<string>('');
  const [prod_name, setProdName] = useState<string>('');
  const [prod_desc, setProdDesc] = useState<string>('');
  const [prod_price, setProdPrice] = useState<string>('');
  const dataLine = useContext<User | undefined>(GetProfile);

  useEffect(() => {
    const liffId = '2005244347-lY246dm4';
    liff
      .init({
        liffId: liffId,
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          // if (dataLine) console.log(dataLine);
        } else {
          liff.login();
        }
      });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(ngrokDomain + '/products', requestOptions)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        alert('เพิ่มข้อมูล Product แล้ว T0T');
      })
      .catch((error) => console.error(error));
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
            Create Products
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="prod_img"
                  label="Product image"
                  variant="outlined"
                  fullWidth
                  required
                  value={prod_img}
                  onChange={(e) => setProdImg(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_name"
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={prod_name}
                  onChange={(e) => setProdName(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_desc"
                  label="Product Desciption"
                  variant="outlined"
                  fullWidth
                  value={prod_desc}
                  onChange={(e) => setProdDesc(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="prod_price"
                  label="Product Price"
                  variant="outlined"
                  type="number"
                  fullWidth
                  required
                  value={prod_price}
                  onChange={(e) => setProdPrice(e.target.value)}
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
