<h1 align="center">replace-text-loader</h1>

<h2 align="center">Install</h2>

```bash
npm i replace-text-loader
```

<h2 align="center">Usage</h2>

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.index.html$/,
        use: [{
            loader: 'replace-text-loader',
            options: {
                rules: [{
                    // inline script, 匹配所有的<script src="package?__inline"></script> 需要inline的标签
                    // 并且替换为 <script>${require('raw-loader!babel-loader!../../node_modules/@tencent/report-whitelist')}</script> 语法
                    pattern: /<script.*?src="(.*?)\?__inline".*?>.*?<\/script>/gmi,
                    replacement: (source) => {
                        // 找到需要 inline 的包
                        const result = /<script.*?src="(.*?)\?__inline"/gmi.exec(source);
                        const pkg = result && result[1];
                        return "<script>${require('raw-loader!babel-loader!" + pkg + "')}</script>";
                    }
                }, {
                    // inline html, 匹配<!--inline[/assets/inline/meta.html]-->语法
                    pattern: /<!--inline\[.*?\]-->/gmi,
                    replacement: (source) => {
                        // 找到需要 inline 的包
                        const result = /<!--inline\[(.*?)\]-->/gmi.exec(source);
                        let path = result && result[1];
                        if (path && path[0] === '/') {
                            path = '../..' + path;
                        }

                        return "${require('raw-loader!" + path +"')}";
                    }
                }]
            }
        }]
      }
    ]
  }
}
```
