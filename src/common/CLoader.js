import React, { useState, useEffect } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import CustomGIF from "../assets/img/loading.gif";

const CLoader = (props) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (props.show !== undefined) {
      setShowLoader(props.show);
    }
  }, [props.show]);
  return (
    <div>
      {showLoader && (
        <Backdrop
          sx={{
            zIndex: 100000,
          }}
          open={true}
        >
          {/* <CircularProgress /> */}
          <img src={CustomGIF} alt="Loading..." style={{ height: "150px" }} />
        </Backdrop>
      )}
    </div>
  );
};

export default CLoader;
