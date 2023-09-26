import React from "react";

import "../styles/globals.css";
import "react-calendar/dist/Calendar.css";
import "../styles/globalsass.scss";
import { store } from "../redux/store";
import { Provider } from "react-redux";

import "aos/dist/aos.css"; // You can also use <link> for styles

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
