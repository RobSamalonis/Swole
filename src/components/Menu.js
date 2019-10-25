import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  menuButton: {
    color: "black",
    backgroundColor: "white"
  }
}));

export default function MyMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className={classes.menuButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => props.changeRoute("Home")}>
          Fitness Tracker
        </MenuItem>
        <MenuItem onClick={() => props.changeRoute("Profile")}>
          My Profile
        </MenuItem>
        <MenuItem onClick={props.logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
