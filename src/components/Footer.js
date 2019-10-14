import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid className="footer" item xs={6}>
          Swole - version 0.0.1 - 2019
        </Grid>
        <Grid className="footer" item xs={6}>
          Developed by <i>Rob Samalonis</i>, with a special thanks to{" "}
          <i>Taylor Johnson</i> for inspiration and rubber ducking.
        </Grid>
      </React.Fragment>
    );
  }
}

export default Footer;
