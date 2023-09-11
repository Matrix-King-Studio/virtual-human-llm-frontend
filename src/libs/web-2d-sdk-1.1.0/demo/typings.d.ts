/*
 * @Author: liyang3
 * @Date: 2020-12-21 14:18:24
 * @LastEditTime: 2021-01-14 15:42:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /admin-system/typings.d.ts
 */
declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
declare module "md5";
declare module 'three'
declare module 'three/examples/jsm/controls/OrbitControls.js'
declare module 'three/examples/jsm/libs/lil-gui.module.min.js'
declare module 'three/examples/jsm/libs/stats.module.js'
declare module 'three/examples/jsm/loaders/GLTFLoader.js'
declare module 'three/examples/jsm/loaders/TGALoader.js'
declare module 'ConfigProvider'
