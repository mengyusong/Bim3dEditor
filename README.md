<!-- markdownlint-disable-next-line -->
<h1 align="center">Bim3d Editor</h1>

<h5 align="center">Author : songmy - work together Contact QQ : 1093697597.</h5>

**Bim3d Editor** 使用流行的前端框架 React 和优秀的 webgl 库 Three.js 打造在线可编辑的 Cad 解析编辑器和自由的3D建模功能. 同时内置对智慧城市,数字孪生,智能家装,web游戏,工业展示等相关3D渲染项目的支持和案例.


- [_Three.js_](https://threejs.org) 是一个跨浏览器JavaScript库和应用程序编程接口（API），用于使用WebGL在web浏览器中创建和显示动画三维计算机图形。

- [_React_](https://reactjs.org) 是一个流行的免费的开源前端JavaScript库，用于基于UI组件快速构建用户界面。

- [_Material UI_](https://mui.com/material-ui/getting-started/overview/) 是一个用于构建谷歌系统样式的全面的组件库 [Material Design](https://material.io/design/introduction/) .

- [_Turf.js_](https://turfjs.org/) 是一个地理空间分析库，处理各种地图算法,使用可读性高的Javascript函数处理GeoJSON.

项目预览地址: https://mengyusong.github.io/bim3d-editor/

<div align="center">

**[稳定的版本通道 alphav1.0](https://gitee.com/songmy1093697597/bim3d-editor/releases/tag/v1.0-alpha)**

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitee.com/songmy1093697597/bim3d-editor/blob/master/LICENSE)


</div>

## 安装

### Bim3d Editor

Bim3d编辑器使用WebGL在web浏览器中显示一站式可编辑的3D项目，目前以支持下载和编辑。

**npm:**

```sh
npm install
npm run dev
```

**yarn:**

```sh
yarn
yarn dev
```

<details>
  <summary>旧版本</summary>

- **[v1.x]** ([Bim3dEditor from v0.0 to v1.0]
- **[v0.x]** ([Bim3dEditor to v0.0])

</details>

**Note:** `@next` only points to pre-releases.
Use `@latest` for the latest stable release.


访问开源仓库 [`store` guide](https://gitee.com/songmy1093697597/bim3d-editor) 获取更多关于引擎的细节。

## 赞助商

### Diamond 💎


Diamond Sponsors are those who have pledged \$100/month or more to Bim3dEditor.

### Gold 🏆


Gold Sponsors are those who have pledged \$500/month or more to MUI.

### More backers

See the full list of [our backers](https://gitee.com/songmy1093697597/bim3d-editor).

## 开始使用 Bim3d-Editor

假设你已经克隆了本仓库，可以从main.tsx开始直接修改使用:

```jsx
import App from '@/views/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@/assets/style/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App/>
    </HashRouter>
  </React.StrictMode>
)
```

目前仍处于开发版本，更多的细节请star本项目并Fork.也可以打开预览地址：https://mengyusong.github.io/bim3d-editor/ 查看最新的进度。


## 问答

有关不涉及对代码库进行更改的操作问题，请参阅代码。

## 示例

请查看预览项目。


## 文档

- [Bim3dEditor]
- [three.js]
- [react]
- [MUI]

## 编辑器

请参阅代码：BIM.ts.

## 贡献

阅读[contributing guide](/README.md)了解我们的开发过程，如何提出错误修复和改进，以及如何构建和测试您的更改。

为Bim3dEditor核心贡献的不仅仅是问题和拉取请求！

还有许多其他方法[支持Bim3dEditor](https://gitee.com/songmy1093697597/bim3d-editor)除了贡献代码库之外。


## 变更记录

 [changelog](https://gitee.com/songmy1093697597/bim3d-editor) 定期更新，以反映每个新版本中的变化。


## 开源许可

本项目根据以下条款获得许可：
[MIT license](/LICENSE).

<!-- markdownlint-disable-next-line -->
<h1 align="center">Bim3d Editor</h1>

**Bim3d Editor** contains foundational React UI component libraries and Three.js to create an online editable CAD analysis editor and free 3D modeling function.

- [_Three.js_](https://threejs.org) Tis a cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser using WebGL.

- [_React_](https://reactjs.org) s a free and open-source front-end JavaScript library for building user interfaces based on UI components. 

- [_Material UI_](https://mui.com/material-ui/getting-started/overview/) is a comprehensive library of components that features our implementation of Google's [Material Design](https://material.io/design/introduction/) system.

- [_Turf.js_](https://turfjs.org/) is a geospatial analysis library, which processes various map algorithms and uses highly readable JavaScript functions to process geojson.

Project preview address: https://mengyusong.github.io/bim3d-editor/

<div align="center">

**[Stable channel v1](https://gitee.com/songmy1093697597/bim3d-editor)**

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitee.com/songmy1093697597/bim3d-editor/blob/master/LICENSE)


</div>

## Installation

### Bim3d Editor

Bim3d Editor is available display animated 3D computer graphics in a web browser using WebGL.

**npm:**

```sh
npm install
npm run dev
```

**yarn:**

```sh
yarn
yarn dev
```

<details>
  <summary>Older versions</summary>

- **[v1.x]** ([Bim3dEditor from v3 to v4]
- **[v0.x]** ([Bim3dEditor to v1])

</details>

**Note:** `@next` only points to pre-releases.
Use `@latest` for the latest stable release.


Visit our [`store` guide](https://gitee.com/songmy1093697597/bim3d-editor) for more information about engine.

## Sponsors

### Diamond 💎


Diamond Sponsors are those who have pledged \$100/month or more to Bim3dEditor.

### Gold 🏆


Gold Sponsors are those who have pledged \$500/month or more to MUI.

### More backers

See the full list of [our backers](https://gitee.com/songmy1093697597/bim3d-editor).

## Getting started with Bim3d-Editor

Assuming that you have cloned this repository, you can directly modify it from main.tsx:

```jsx
import App from '@/views/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@/assets/style/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App/>
    </HashRouter>
  </React.StrictMode>
)
```

It is still in the development version. For more details, please click star and fork. You can also open the preview address: https://mengyusong.github.io/bim3d-editor/ View the latest progress.


## Questions

For how-to questions that don't involve making changes to the code base, please see code.

## Examples

none

## Documentation

- [Bim3dEditor]
- [three.js]
- [react]
- [MUI]

## Premium themes

You can find complete templates and themes in the code.

## Contributing

Read the [contributing guide](/README.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes.

Contributing to Bim3dEditor Core is about more than just issues and pull requests!
There are many other ways to [support Bim3dEditor](https://gitee.com/songmy1093697597/bim3d-editor) beyond contributing to the code base.

## Changelog

The [changelog](https://gitee.com/songmy1093697597/bim3d-editor) is regularly updated to reflect what's changed in each new release.


## License

This project is licensed under the terms of the
[MIT license](/LICENSE).






