import { FC, useEffect, useState } from "react";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import screenFull from "screenfull";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Modal } from "antd";
import { connect } from "react-redux";
import { reducersType } from "../../../redux/reducers";
import { createDeleteUserInfoAction } from "../../../redux/actions_creators/login_action";
import { reqWeather } from "../../../api";
import titles from "../../../config/titleConfig";
import menuList from "../../../config/menuConfig";
import { WeatherType } from "../../../type";
import "./css/Header.less";

const { confirm } = Modal;

const mapStateToProps = (state: reducersType) => ({
  userInfo: state.userInfo,
  title: state.title,
});

const mapDispatchToProps = { deleteUser: createDeleteUserInfoAction };

type HeaderProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  const [isFull, setFull] = useState(false);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [title, setTitle] = useState("");
  const pathName = useLocation().pathname;

  const setFullChange = () => {
    setFull(!isFull);
  };

  const initWeatherAndTemperature = async () => {
    let result = (await reqWeather()) as unknown as WeatherType;
    const { weather, temperature } = result;
    setWeather(weather);
    setTemperature(temperature);
  };

  const GetTitle = (pathName: string) => {
    let result = "";
    if (pathName.includes("product")) {
      result = "商品管理";
    }
    menuList.forEach((item) => {
      if (item.children instanceof Array) {
        let tmp = item.children.find((citem) => {
          return citem.path === pathName;
        });
        if (tmp) {
          result = tmp.title;
        }
      } else {
        if (pathName === item.path) {
          result = item.title;
        }
      }
    });
    setTitle(result);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setDate(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    initWeatherAndTemperature();
    GetTitle(pathName);
    return () => {
      clearInterval(timer);
    };
  }, []);

  //isFull update
  useEffect(() => {
    screenFull.on("change", setFullChange);
    return () => {
      screenFull.off("change", setFullChange);
    };
  }, [isFull]);

  const fullScreen = () => {
    screenFull.toggle();
  };

  const logOut = () => {
    confirm({
      icon: <QuestionCircleOutlined />,
      content: "确定退出?若退出需要重新登陆",
      cancelText: "取消",
      okText: "确认",
      onOk: () => {
        props.deleteUser();
      },
    });
  };

  return (
    <header className="header">
      <div className="header-top">
        <Button size={"small"} onClick={fullScreen}>
          {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </Button>
        <span className="username">欢迎,{props.userInfo.user.username}</span>
        <Button
          className="logOut-btn"
          type="link"
          size="small"
          onClick={logOut}
        >
          退出登录
        </Button>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">
          {titles.get(props.title) || title}
        </div>
        <div className="header-bottom-right">
          <span>{date}</span>
          <img
            src="http://api.map.baidu.com/images/weather/day/qing.png"
            alt="天气信息"
          />
          <span>
            {weather}&nbsp;温度&nbsp;{temperature}
          </span>
        </div>
      </div>
    </header>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
