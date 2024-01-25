import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CSnackbar = (props) => {
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    setSnackbar({
      children: props.description,
      severity: props.type,
    });
  }, [props]);

  return (
    <div>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};

export default CSnackbar;
