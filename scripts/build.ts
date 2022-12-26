import { build, type BuildOptions } from 'esbuild';
import { stringify, type Metadata } from 'userscript-metadata';
import pkg from '~package.json';

const metadata: Metadata = {
  version: pkg.version,
  match: '*://*/*',
  name: 'Fragment Anchor',
  'name:ja': 'フラグメントアンカー',
  homepage: 'https://greasyfork.org/ja/users/297030',
  description: pkg.description,
  'description:ja': 'ページ内のすべての要素のidをリストアップしてその要素へアンカーするボタンを追加するユーザースクリプトです。',
  author: pkg.author,
  license: pkg.license,
  grant: 'GM.registerMenuCommand',
  require: [
    'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
    'https://cdn.jsdelivr.net/npm/@emotion/react@11.1.1/dist/emotion-react.umd.min.js',
    'https://unpkg.com/@mui/material@5.11.1/umd/material-ui.production.min.js'
  ]
};

const options: BuildOptions = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  platform: 'browser',
  tsconfig: 'tsconfig.build.json',
  outfile: 'dist/index.js',
  banner: {
    js: stringify(metadata)
  }
};

build(options).catch(err => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
