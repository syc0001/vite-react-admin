/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

/**
 * 前缀url
 */
// 设定BaseURL直接跨域请求的时候不需要加api前缀(仅设置生产模式)
// export const BASE_URL = process.env.NODE_ENV === "production" ? "" : "/api";
export const BASE_URL = "/api";
console.log(process.env.NODE_ENV); //development

/**
 * 高德地图的url
 */
export const A_MAP_URL = "/amap";
/**
 * 高德地图的key
 */
export const A_MAP_KEY = "af82b3912a23a1e25ddd23ff99fab065";
/**
 * 城市编码
 */
export const CITY_CODE = "350200";
/**
 * 表格分页条数
 */
export const PAGE_SIZE = 5;
