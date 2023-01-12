/**
 * @description 基础类型
 */
interface BaseType {
  status: number;
  data: unknown;
  msg: string;
}

/**
 * @description 天气接口返回数据
 */
export interface WeatherType {
  weather: string;
  temperature: number;
}