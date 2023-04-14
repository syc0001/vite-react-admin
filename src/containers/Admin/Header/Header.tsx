/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { FC, useEffect, useState } from "react";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
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
import Modules from "./css/Header.module.less";

const { confirm } = Modal;

// redux状态 start ========================================================================
const mapStateToProps = (state: reducersType) => ({
  userInfo: state.userInfo,
  title: state.title,
});
const mapDispatchToProps = { deleteUser: createDeleteUserInfoAction };
type HeaderProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
// redux状态 end ==========================================================================

  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));
const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const [isFull, setFull] = useState(false);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [title, setTitle] = useState("");
  const pathName = useLocation().pathname;

  /**
   * 组件挂载的时候取得时间,初始化天气,获取标题
   */
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

  /**
   * 设置全屏
   */
  useEffect(() => {
    screenFull.on("change", setFullChange);
    return () => {
      screenFull.off("change", setFullChange);
    };
  }, [isFull]);

  /**
   * @description 设置是否全屏
   */
  const setFullChange = () => {
    setFull(!isFull);
  };

  /**
   * @description 初始化天气
   */
  const initWeatherAndTemperature = async () => {
    let result = (await reqWeather()) as unknown as WeatherType;
    const { weather, temperature } = result;
    setWeather(weather);
    setTemperature(temperature);
  };

  /**
   * @description 获取标题
   * @param {string} pathName 路径名称
   */
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

  /**
   * @description 设置全屏
   */
  const fullScreen = () => {
    screenFull.toggle();
  };

  /**
   * @description 生成退出的弹窗
   */
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
    <header className={Modules.header}>
      <div className={Modules.headerTop}>
        <Button size={"small"} onClick={fullScreen}>
          {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </Button>
        <span className={Modules.username}>
          欢迎,{props.userInfo.user.username}
        </span>
        <Button
          className={Modules.logOutBtn}
          type="link"
          size="small"
          onClick={logOut}
          icon={<LogoutOutlined />}
        >
          退出登录
        </Button>
      </div>
      <div className={Modules.headerBottom}>
        <div className={Modules.headerBottomLeft}>
          {titles.get(props.title) || title}
        </div>
        <div className={Modules.headerBottomRight}>
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
