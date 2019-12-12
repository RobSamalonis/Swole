import React, { Component } from "react";

import packageJson from "../../package.json";

import Grid from "@material-ui/core/Grid";

import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid className="footer" item xs={6}>
          Swole - v{packageJson.version}
        </Grid>
        <Grid className="footer" item xs={6}>
          Developed by <i>Rob Samalonis</i>, with a special thanks to
          <i> Taylor Johnson</i> for inspiration and rubber ducking.
          {/* add social media tags */}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Footer;
