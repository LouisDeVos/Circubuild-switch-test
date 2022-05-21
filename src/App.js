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
  //Deze useState variabele wordt het antwoord op de query, hier is het een resultaat van een dropdown en het bepaalt direct welke "case" de switch kiest.
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
 //Deze variabelen zijn nodig om te kunnen navigeren door een pdf via react-pdf




  const handleChange = (event) => {
    setMat(event.target.value);
    //Hangt samen met de dropdown
    
  };

  const showPDF = (mat) => {
    switch (mat) {
      case "0":
          console.log("not chosen")
          document.getElementById('name').textContent = "Please choose a material"
          document.getElementById('download').href= "http://localhost:5000/Louis-De-Vos/lbd/voorpost/pdfs/FCRBE.pdf"
          document.getElementById('download').textContent= "Download Intro"
          //document.getElementById('viewer').file= "./WRAP.pdf"
        break;

      case "1":
          console.log("concrete shear wall")
          document.getElementById('name').textContent = "You chose a concrete shear wall"
          document.getElementById('download').href= "http://localhost:5000/Louis-De-Vos/lbd/voorpost/pdfs/concrete.pdf"
          document.getElementById('download').textContent= "Download PDF"
        break;

      case "2":
          console.log("metal cladding")
          document.getElementById('name').textContent = "You chose a metal cladding"
          document.getElementById('download').href= "http://localhost:5000/Louis-De-Vos/lbd/voorpost/pdfs/metal.pdf"
          document.getElementById('download').textContent= "Download PDF"
        break;

      case "3":
          console.log("door")
          document.getElementById('name').textContent = "You chose a door"
          document.getElementById('download').href= "http://localhost:5000/Louis-De-Vos/lbd/voorpost/pdfs/door.pdf"
          document.getElementById('download').textContent= "Download PDF"
        break;

      default: console.log("default")
        break;  
    }

  }

  //De switch bepaalt nu enkel de url van de download knop en geeft via een <p> zicht op de juiste werking. Het is mij nog niet gelukt om de "file" property van de Page component aan te passen afh van de switch, ik krijg een wit scherm zonder errors.

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

  //Functies om te kunnen navigeren in de pdf.

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

{/* Deze knop werkt niet, maar is wel nodig om de switch te laten werken. Waarom is voor mij nog een mysterie, je kan miss proberen om die verwijderen, maar dat gaf bij mij een probleem (switch functie werkte niet meer). */}

      <p id="name"></p>

      <center>
      <div><Button id="download" href='http://localhost:5000/Louis-De-Vos/lbd/voorpost/pdfs/FCRBE.pdf' target = "_blank" variant="contained"></Button></div>
        <Document id="viewer" file="/FCRBE.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page id="page" height="1000" pageNumber={pageNumber}/>
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
