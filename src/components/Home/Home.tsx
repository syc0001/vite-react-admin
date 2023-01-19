/**
 * @author ShiYiChuang
 * @date 2022-1-14
 */
import { FC } from "react";
import styles from "./css/home.module.less"

/**
 * @description 首页
 * @constructor
 */
const Home: FC<unknown> = () => {
  return (
    <div className={styles.container}>
      <h1>欢迎使用商品管理系统</h1>
    </div>
  );
};

export default Home;
