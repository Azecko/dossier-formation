import './App.css';
import React, { useState } from 'react';
import data from '../src/data.json';
import useCollapse from "react-collapsed";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Collapse from "@mui/material/Collapse";

function ToggleButtons(data) {
  const [showBox, setShowBox] = React.useState(false);

  return (
    <>
      <ToggleButtonGroup
        value={showBox}
        exclusive
        onChange={(_, value) => setShowBox(value)}
      >
        <ToggleButton value={!showBox} style={{display: 'inline'}}>Show</ToggleButton>
      </ToggleButtonGroup>

      {showBox}

      {
        data["Objectifs évaluateurs entreprise"].map(e => {
          return (
            <h4><Collapse in={showBox}>{e.id} - {e.descr} ({e.bloom})</Collapse></h4>
          )
        })
      }
    </>
  );
}

function Competences(data) {
  const { getCollapseProps, getToggleProps } = useCollapse();
  const [rotateChevron, setRotateChevron] = useState(false);

  const handleRotate = () => setRotateChevron(!rotateChevron);

  const rotate = rotateChevron ? "rotate(90deg)" : "rotate(0)"

  return (
    <div className="collapsible">
      <h2 className="title">{data.title} - {data.subject} <span onClick={handleRotate}><ArrowForwardIosIcon style={{ transform: rotate, transition: "all 0.2s linear" }} className="arrow" color="primary" fontSize='small' {...getToggleProps()}/></span></h2>
      <div {...getCollapseProps()}>
        {
          data.competences.map(e => {
            return (
              <div>
                <h3>{e.title} - {e.subject} <span onClick={handleRotate}></span></h3>
                {
                  ToggleButtons(e)
                }

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

function App() {
  return (
    
    <div style={{marginLeft:"20px"}}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <h1>Dossier de formation</h1>
      <div>
        {
          data.map(e => {
            return Competences(e);
          })
        }
      </div>
    </div>
  );
}

export default App;
