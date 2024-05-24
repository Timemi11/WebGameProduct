import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import { ButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import liff from '@line/liff';
import { ngrokDomain } from '../Component/pathngrok/ngrokdomain';
import './custom.css';


type List = {
  prod_img: string;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
};
// ตัวอย่างข้อมูล
// prod_img : https://th.bing.com/th/id/OIP.Z7ONfsHRRODBL1xmGG65RwHaE7?w=719&h=479&rs=1&pid=ImgDetMain
// prod_name: ไอโฟน
// prod_desc : สุดยอดกล้อง
// prod_price : 1200

export default function Product() {
  const [items, setItems] = useState<List[]>([]);
  // const liffId = '2005244347-lY246dm4';

  const ProductUpdate = (id: string) => {
    window.location.href = '/update/' + id;
  };

  const ProductDelete = (id: string) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(ngrokDomain + '/products/' + id, requestOptions)
      .then((response) => response.json())
      .then(() => UserGet())
      .catch((error) => console.error(error));
  };

  const UserGet = () => {
    fetch(ngrokDomain + '/products')
      .then((res: Response) => res.json()) //  .then ส่งค่าคืนมาเป็นformat json  สามารถ ส่งค่า resolve function และ reject function
      .then((result) => {
        setItems(result);
      });
  };

  useEffect(() => {
    UserGet();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        className="w-full h-full pt-8 "
        style={{ 
          backgroundColor: '#0C0D14',
      }}
      >
        <Container maxWidth="lg" sx={{ p: 2 } }>
          <Paper 
          sx={{ p: 2 }} 
          style={{backgroundColor:"#1A1B28"}} >
            <Box display={'flex'}>
              <Box sx={{ width: '100%' }}>
                <Typography  className='font-custom text-superlarge'  variant="h6" gutterBottom component={'div'}>
                  GameProducts Table
                </Typography>
              </Box>
              <Box>
                <Link href="/create">
                  <Button variant="contained">Create</Button>
                </Link>
              </Box>
            </Box>
            <TableContainer style={{backgroundColor:"#1A1B28" }}   component={Paper} sx={{ marginTop: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow  >
                    <TableCell className='font-custom' >
                      ID
                      </TableCell>
                    <TableCell className='font-custom'  align="right">GameProducts_Image</TableCell>
                    <TableCell align="right" className='font-custom' > GameProducts_Name</TableCell>
                    <TableCell align="left" className='font-custom' >
                    GameProducts_Description
                    
                    </TableCell>
                    <TableCell align="right" className='font-custom' >
                      GameProducts_Price
                    
                      </TableCell>
                    <TableCell align="right" className='font-custom' >
                    User_Avatar 
                    </TableCell>
                    <TableCell align="right" className='font-custom' >
                               User_Id 
                    </TableCell>
                    <TableCell align="right" className='font-custom' >
                    User_Name
               
                    
                    </TableCell>
                    <TableCell align="right" className='font-custom' >
                    User_StatusName
                      
                      
                      </TableCell>
                    <TableCell align="right" className='font-custom' >
                      Upload_Date
                    
                      </TableCell>
                    <TableCell align="right" className='font-custom' >
                       Action
                    
                      
                      </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row: any) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell className='font-custom' component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell align="right">
                        <img className="rounded-lg" src={row.prod_img}></img>
                      </TableCell>
                      <TableCell align="right" className='font-custom' >{row.prod_name}</TableCell>
                      <TableCell
                        className="text-wrap font-custom"
                        style={{
                          minWidth: '500px',
                        }}
                        align="left"
                      >
                        {row.prod_desc}
                      </TableCell>
                      <TableCell
                      className='font-custom' 
                        style={{
                          minWidth: '200px',
                        }}
                        align="right"
                      >
                        {row.prod_price} บาท
                      </TableCell>
                      <TableCell align="right" className='font-custom' >
                        <img className="rounded-lg" src={row.pictureUrl}></img>
                      </TableCell>
                      <TableCell align="right" className='font-custom' >{row.userId}</TableCell>
                      <TableCell align="right" className='font-custom' >{row.displayName}</TableCell>
                      <TableCell align="right" className='font-custom' >{row.statusMessage}</TableCell>
                      <TableCell align="right" className='font-custom' >{row.update_at}</TableCell>
                      <TableCell align="right" className='font-custom' >
                        <ButtonGroup
                          variant="outlined"
                          aria-label="Basic button group"
                        >
                          <Button
                            sx={{ marginRight: 1 }}
                            variant="contained"
                            color="warning"
                            onClick={() => ProductUpdate(row._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => ProductDelete(row._id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}
