
import React,{useState,useEffect} from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {

  const [data,setData]=useState([]);
    const getData=()=>{
      fetch('data.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          // console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          // console.log(myJson);
          setData(myJson)
        });
    }
    useEffect(()=>{
      getData()
      // const rows = data;
    },[])

 console.log(data);
  return (
    <div className='table'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country Name</StyledTableCell>
            <StyledTableCell align="right">Currency</StyledTableCell>
            <StyledTableCell align="right">Population&nbsp;(million)</StyledTableCell>
            <StyledTableCell align="right">FlagURL</StyledTableCell>
            <StyledTableCell align="right">GDP&nbsp;(billion USD)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={data.countryName}>
              <StyledTableCell component="th" scope="row">
                {row.countryName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.currency}</StyledTableCell>
              <StyledTableCell align="right">{row.population}</StyledTableCell>
              <StyledTableCell align="right">{<a href={row.flagURL}>Visit to flag</a>}</StyledTableCell>
              <StyledTableCell align="right">{row.GDP}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
