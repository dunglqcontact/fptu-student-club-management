import React from "react";

// material UI
import { CssBaseline } from "@mui/material";

// Link component
import ThemeConfig from "./Themes/index.js";
import Routes from "./Routes/routes";
import NavigationScroll from "./Layout/NavigationScroll";
import GlobalStyles from "./Themes/globalStyles";

function App() {
  return (
    <>
      <ThemeConfig>
        <CssBaseline />
        <GlobalStyles />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeConfig>
    </>
  );
}

export default App;
