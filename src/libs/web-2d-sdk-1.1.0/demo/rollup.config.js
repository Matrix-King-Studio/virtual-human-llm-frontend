import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 告诉rollup去哪里找依赖库
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser'; // 压缩
const pkg = require('./package.json');
// Version
const pkgVersion = pkg.version;

// Name of package
const pkgName = pkg.name;

// banner
const banner =
  '/*!\n' +
  ` * vms.js v${pkgVersion}\n` +
  ` * (c) 2020-${new Date().getFullYear()} \n` +
  ' * Released under the MIT License in iflytek.\n' +
  ' */\n';

const isProduction = process.env.NODE_ENV === 'production';

const destFolder = isProduction ? 'dist' : 'demo/lib';

const output = isProduction
  ? [
    {
      file: `./${destFolder}/${pkgName}-${pkgVersion}.js`,
      format: 'umd', // 模块输出格式：es、cjs、amd、umd、iife、system
      name: 'VMS', // 指定打包后模块的输出结果接收变量
      globals: {
        crypto: 'crypto',
      },
      banner: banner,
    },
    {
      file: `./${destFolder}/${pkgName}-${pkgVersion}.esm.js`,
      format: 'esm', // 模块输出格式：es、cjs、amd、umd、iife、system
      name: 'VMS', // 指定打包后模块的输出结果接收变量
      globals: {
        crypto: 'crypto',
      },
      banner: banner,
    },
  ]
  : [
    {
      file: `./${destFolder}/${pkgName}.js`,
      format: 'esm', // 模块输出格式：es、cjs、amd、umd、iife、system
      name: 'VMS', // 指定打包后模块的输出结果接收变量
      globals: {
        crypto: 'crypto',
      },
      banner: banner,
    },
  ];

const extensions = ['.ts'];

const configuration = {
  input: './src/index.ts',
  output,
  plugins: [
    json({
      namedExports: false,
    }),
    nodeResolve({
      extensions,
    }),
    babel({
      exclude: 'node_modules/**', // 排除node_modules 下的文件
      runtimeHelpers: true,
      extensions,
    }),
    commonjs({
      sourceMap: true,
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV),
      __VERSION__: JSON.stringify(pkgVersion),
    }),
  ],
};

if (isProduction) {
  const { terser } = require('rollup-plugin-terser');
  const output = configuration.output.map((output) => {
    const buildOutput = Object.assign({}, output);
    buildOutput.file = buildOutput.file.replace(/\.js$/, '.min.js');
    buildOutput.plugins = [
      terser({
        module: true,
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
      }),
    ];
    return buildOutput;
  });
  configuration.output = [...configuration.output, ...output];
}

export default configuration;
