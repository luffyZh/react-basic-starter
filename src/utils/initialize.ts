import request from './request';

export default function() {
  // 拦截请求响应
  request.interceptors.response = async function(response): Promise<IResponseBody<any>> {
    const res: IResponseBody<any> = await response.json();

    if (res.code === 0) {
      return res;
    } else {
      // eslint-disable-next-line
      throw {
        statusCode: res.code,
        statusText: res.data,
        message: res.message,
        url: response.url,
        res,
      };
    }
  };

  // 拦截请求异常
  request.interceptors.catch = function(error) {
    console.log('Error: ', error);
    /**
     * 正常的 error 应该是 status 和 statusText
     * 内部系统存在很多自定义的东西，比如 statusCode 和 message,
     * 如果是请求异常，那么错误代码和错误信息是 status 和 statusText
     * 如果是请求成功，后台数据异常那么错误代码和错误信息是 statusCode 和 message，是上面的代码 throw 出来的 Error
     */
    if (error.message?.includes('aborted')) {
      console.log('用户终止了请求，啥也不干');
      return;
    }

    // 请求超时
    if (error.status === 408) {
      alert('请求响应超时，请稍后重试');
      return;
    }

    // alert(`服务器错误 - ${error.status || error.statusCode}: ${error.statusText || error.message}`);
    alert(`服务器请求错误${error.message && error.message.split(':')[1] ? ` - ${error.message.split(':')[1]}` : ''}`);
  };
}
