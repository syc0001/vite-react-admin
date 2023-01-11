import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1DA57A",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
