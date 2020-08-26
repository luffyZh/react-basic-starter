import _ from 'lodash';

/** 获取图片base64格式 */
export function imgToBase64(url: string, callback: (result: string | ArrayBuffer | null) => void) {
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    const reader = new FileReader();

    reader.onloadend = function() {
      callback(reader.result);
    };

    reader.readAsDataURL(xhr.response);
  };

  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

/**
 * 检验是否是标准手机号
 */
export function checkIsPhone(value: string) {
  return /^1[3456789]\d{9}$/.test(value);
}

/**
 * 压入请求控制函数
 * @param controller 请求控制器
 */
export function requestControllerPush(controller: any) {
  const currentQuene = window.config.requestList;
  if (!(currentQuene[currentQuene.length - 1]?.url === controller.url)) {
    // 压入的和最后一个是否相同，不相同，直接压入
    currentQuene.push(controller);
    return;
  }
  // 压入的和最后一个相同，把最后一个请求 abort 调然后再压入
  currentQuene.pop().abort();
  currentQuene.push(controller);
}

/**
 * 成功的时候弹出对应的请求
 * 要不然即使成功了，也会 abort
 */
export function requestControllerPop(controller) {
  _.pull(window.config.requestList, controller);
}

/**
 * 页面切换的时候清空所有的请求
 */
export function clearRequestController() {
  const controllerQuene = window.config.requestList;
  /**
   * 路又切换的时候先终止所有的
   * 再进行清空
   */
  console.log('路又切换，应该清空前一路由所有的 controller: ');
  controllerQuene.forEach(function(controller) {
    if (window.location.pathname !== controller.group) {
      controller.abort();
      _.pull(controllerQuene, controller);
    }
  });
  console.log('Current Request Controller: ', controllerQuene);
}
