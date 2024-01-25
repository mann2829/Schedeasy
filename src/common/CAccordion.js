import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState, useEffect } from "react";
import {ReactComponent as ArrowDown} from '../assets/img/arrow-down.svg';

  const CAccordion = (props) => {
    const [children, setText] = useState("");
    const [expanded, setExpanded] = useState("panel1");
  
    useEffect(() => {
      if (props.children !== undefined) {
        setText(props.children);
      }
    }, [props.children, props.showLoader]);
  
    useEffect(() => {
      setExpanded(props.expanded === false ? false : true);
    }, [props.expanded]);
  
    const handleChange = () => () => {
      setExpanded(!expanded);
    };
  
    return (
      <>
        <Accordion
          className={props.className}
          expanded={expanded}
          onChange={handleChange()}
        >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ArrowDown />}
            >
                <h4>{props.title}</h4>
          </AccordionSummary>
          <AccordionDetails>{props.children}</AccordionDetails>
        </Accordion>
      </>
    );
  };
  
  export default CAccordion;
  