/// <reference types="vite/client" />

declare module "*.less" {
  const less: { [key: string]: string };
  export default less;
}
