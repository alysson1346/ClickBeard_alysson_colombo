import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { FaCheck } from "react-icons/fa";

export default function PopoverFinished({ onClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        sx={{ backgroundColor: "black", padding: "5px", minWidth: 0 }}
        onClick={handleClick}
      >
        <FaCheck />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button
          onClick={onClick}
          sx={{ color: "green", padding: "5px", minWidth: 0 }}
        >
          Concluir
        </Button>
      </Popover>
    </div>
  );
}
