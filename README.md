# Bare-bones Typescript ThreeJS

Bare-bones webpage using [threeJS](https://threejs.org/) and [dat.gui](https://github.com/dataarts/dat.gui). Authored using typescript and transpiled with webpack.

## How to run

In vscode, run `npm run-script start-dev-server` and then either open a page in your browser at `localhost:8080` or start debugging in vscode using this configuration:

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch Chrome",
  "url": "http://localhost:8080",
  "sourceMaps": true,
  "sourceMapPathOverrides": {
    "webpack:///./*": "${workspaceRoot}/*",
    "webpack:///src/*": "${workspaceRoot}/*",
  }
}
```

## How to build

Run `npm run-script build`, the result will be place in the folder specified as `outputFolderName` in the webpack config file.
