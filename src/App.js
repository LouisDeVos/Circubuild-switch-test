import './App.css';
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';


function App() {
  const [mat, setMat] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
 
  const handleChange = (event) => {
    setMat(event.target.value);
    //console.log(mat);
    
  };

  const showPDF = (mat) => {
    switch (mat) {
      case "0":
          console.log("not chosen")
          document.getElementById('name').textContent = "Please choose a material"
          document.getElementById('download').href= "./WRAP.pdf"
          document.getElementById('download').textContent= "Download PDF"
          //document.getElementById('viewer').file= "./WRAP.pdf"
        break;

      case "1":
          console.log("concrete shear wall")
          document.getElementById('name').textContent = "You chose a concrete shear wall"
        break;

      case "2":
          console.log("metal cladding")
          document.getElementById('name').textContent = "You chose a metal cladding"
        break;

      case "3":
          console.log("door")
          document.getElementById('name').textContent = "You chose a door"
        break;

      default: console.log("default")
        break;  
    }

  }

  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet){
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  function changePageBack(){
    changePage(-1)
  }

  function changePageNext(){
    changePage(+1)
  }

  return (
    <>
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      p:2,
      border: '1px dashed grey',
      boxShadow: 3 
    }}>
      <FormControl width="40">
        <InputLabel id="demo-simple-select-label">Material Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mat}
          label="Material Class"
          onChange={handleChange}
        >
          <MenuItem value={"0"}>Choose a material</MenuItem>
          <MenuItem value={"1"}>Concrete shear wall</MenuItem>
          <MenuItem value={"2"}>Metal cladding</MenuItem>
          <MenuItem value={"3"}>Doors</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={showPDF(mat)} variant="disabled">Show PDF</Button>
      <p id="name"></p>
      <a id="download" href='./FCRBE.pdf' target = "_blank">.</a>
      <center>
        <Document id="viewer" file="/FCRBE.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page height="1200" pageNumber={pageNumber}/>
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        { pageNumber >1 &&
        <Button onClick={changePageBack}>Previous Page</Button>}
        {
          pageNumber < numPages &&
          <Button onClick={changePageNext}>Next Page</Button>
        }

        
      </center>
      
    </Box>
   
    
  </>
  );
}

export default App;
