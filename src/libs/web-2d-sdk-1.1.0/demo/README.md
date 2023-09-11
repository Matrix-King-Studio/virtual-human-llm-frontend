# web-3d-virtual-demo

虚拟人2D Web SDK Demo，如有补充，可及时联系：liyang3

## 启动
1、在项目根目录下，执行`npm i`
2、安装完毕之后，执行`npm run dev`
3、在浏览器输入`http://localhost:8891/3d/vms` 即可浏览虚拟人 web SDK 测试工具（体验demo）
4、在浏览器输入`http://localhost:8891/3d/` 浏览 demo

## 说明
1、虚拟人web sdk在`src/libs`文件夹下，名称为：`vms-web-2d-sdk`，当前版本为：1.1.0
2、虚拟人web sdk 提供`umd、commonJS、es module`三种模式，方便所有场景使用
3、使用方式请参照`Demo`中`src/pages/vms/index.tsx`模块
4、`Demo`使用`ReactJS + Vite` 开发，如发现任何问题，及时沟通反馈，感谢指正

## 特别注意
集成sdk，项目中必须配置代理，如下：
```javascript
 '/vmss': {
    target: 'http://vms.cn-huadong-1.xf-yun.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/vmss/, '')
  }
```
```javascript
  '/individuation': {
    target: 'https://evo-hu.xf-yun.com',
    changeOrigin: true
  }
```


