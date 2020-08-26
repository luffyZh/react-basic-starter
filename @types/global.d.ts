/*
 * @Author: your name
 * @Date: 2020-08-26 10:46:12
 * @LastEditTime: 2020-08-26 11:25:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-easy-peasy-ts/@types/global.d.ts
 */
/* eslint-disable @typescript-eslint/interface-name-prefix, @typescript-eslint/array-type */
declare interface Window {
  config: {
    version: string;
    systemName: string;
    requestList: any[];
  };
}

/**
 * 解决 PromisConstructor 不支持 Promise.allSettled
 */
declare interface PromiseConstructor {
  allSettled(promises: Array<Promise<any>>): Promise<Array<any>>;
}

declare interface IResponseCustom extends Response {
  statusCode: number; // Response 里面只有 status，并没有 statusCode
  message: string;
  abort: any;
  url: string;
}

declare interface IResponseBody<T> {
  data: T;
  code: number;
  message?: string;
}

/**
 * 自定义的 AbortController 除了最基本的属性外还包括
 * url: 请求的链接
 * group: 请求所在的页面
 */
declare interface IAbortControllerCustom extends AbortController {
  url?: string; // 给 requestController 绑定 url，用来判断前后 controller 是否重复
  group?: string; // 给 requestConroller 绑定 域名，切换路由的时候把不同域名的 controller 移除
}

/**
 * 组件不知道传什么，就用这个。比如，根组件，路由组件等
 */
declare interface IComponentProps {
  [key: string]: any;
}
