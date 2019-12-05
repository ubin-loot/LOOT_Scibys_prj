# Webpack basic template


### webpack package install 

  webpack 은 모듈 번들러이다.
  각 브라우저에 그대로 전달하면 브라우저가 이를 해석하고 사용자에게 출력하는과정이 점점 버거워지게 된다.

  다양한 파일들이 의존하는 그 관계들을 정리하고, 최적화 하는 것이 필요해 진다.
  최적화 하는 것을 webpack 이 수행한다.
  
  이제 우리의 프로젝트 파일에 웨팩을 설치한다.(웹팩 버전 4)
  루프 폴더(react) npm을 통해 개발을 할 떄 필요한 Dependencies를 설치.

  ```
    $ npm init -y
    $ npm install --save-dev webpack webpack-dev-server webpack-cli

  ```

  --save는 Dependencies 들을 package.json 파일에 저장하는 것을 의미
  -dev는 개발에만 사용하는 Dependencies 라는 의미입니다.

  ```
  ./package.json
   
    ...
    "scripts": {
 
      "start": "webpack-dev-server --config ./webpack.config.js --mode development",
      
      ...
    },

  ```
  package.json 에 'start: wepack...'을 추가해준다.


  ```
  ./webpack.config.js

    module.exports = {
      entry: [
        './src/index.js'
      ],
      output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
      },
      devServer: {
        contentBase: './dist'
      }
    };

  ```

  webpack.config.js 파일을 생성해주고 위와 같이 작성을 한다.
  
  entry는 의존성 그래프의 시작점을 의미한디.
  webpack은 엔트리를 기점으로 필요한 파일들을 로드하여 하나의 파일로 묶어준다.

  entry: [./src/index.js] 파일을 정의하여 이는 index.js 파일을 index.js 파일 안으로 임포트 되는 모든 파일들을 번들링하겠다는 의미이다.

  filename 부분은 번들링 된 파일의 이름을 bundle.js 로 지정하겠다는 의미




### html file make

  ```
    dist/index.html

    <!DOCTYPE html>
    <html>
      <head>
        <title>React Webpack Babel Setup</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>

  ```


### Babel package install
webpack 설치가 완료되면 babel 설치를 한다.
react 컴포넌트들은 대부분 ES6 문법인데, 브라우저에 따라서 ES6 문법을 이해하지 못할 수 있다.
이런 부분을 babel을 사용해 문제를 해결한다.

```
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react

아래의 properties 를 
npm install --save-dev @babel/plugin-proposal-class-properties 


babel-preset-stage 설치를 안하고 진행.

babel에 @ 없는 버전은 전버전이고 @babel은 7 버전으로 알고있다.

* @babel/preset-stage-2 는 ES6의 object spread 와 같은 문법을 사용하려면 stage-2를 추가한다.
  - babel-preset-stage-0
  - babel-preset-stage-1
  - babel-preset-stage-2
  - babel-preset-stage-3
  - babel-preset-stage-4

  babel-preset-stage-4는 babel-preset-es2015를 의미.

  babel에서 이들을 모두 한번에 사용할 수 있도록 해주는 preset을 하나 제공했는데요, 바로 babel-preset-env 이다.
  preset으로 모든 stage를 대체할 수 있습니다.

```

```
./webpack.config.js 
entry 와 output 사이에 아래와 같이 붙여넣는다.

 module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
```

```
./.babelrc
파일을 생성해서 작성한다.
{
  "presets": [
    "@babel/preset-env", 
    "@babel/preset-react",
  ]

}

```


### React 설치 및 설정 (webpack + babel)

webpack 과 babel 의 설치 및 설정이 끝나면 react 설치
루트 폴더에서 npm을 통해서 react와 react-dom을 설치해준다.

```
  $ npm install --save react react-dom

```


### Hot module replacement install

 Hot module replacement 

 webpack-dev-server 는 수정한 내용이 있으면 파일의 변화를 감지하여 웹페이지를 새로고침해서 보여준다.
 하지만 Hot module replacement 는 변화를 감지한 부분만 렌더링 된다.


```

npm install --save-dev react-hot-loader

```


```

  ./webpack.config.js

  const webpack = require('webpack');
  ...
      'react-hot-loader/patch',
  ...

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
  ...
      hot: true

```

```
./src/index.js
하단에 추가를 해준다.
  module.hot.accept();


```



# project dependencies install

### Global dependency

```
  npm install -g babel-cli nodemon cross-env

```
* babel-cli : 콘솔 환경에서 babel 을 사용할 수 있게 해주는 모듈
* nodemon : development 환경에서 파일이 수정될 때마다 서버를 재시작해주는 모듈
* cross-env : 윈도우 / 리눅스 / OSX 에서 환경변수 값을 설정해주는 모듈


### Local Dependency install
```
  npm install --save express body-parser

```

* express : Node.js 웹 프레임 워크
* body-parser : JSON 형태의 데이터를 HTTP 요청에서 파싱할 때 사용(req.body 로 접근할 수 있도록)




### 디렉토리 구조
- dist (리액트 컴포넌트를 렌더링할 대상)

- index.html

- server (BACK-END)

- models

: mongoose 모델이 위치하는 디렉토리

- routes

: API 들이 위치하는 디렉토리

- main.js : 서버를 위한 js 파일

- src (FRONT-END)

- actions

: actionType, action 생성자 함수, thunk 가 위치할 디렉토리

- components

: 기능을 가진 컴포넌트 (작은단위의 컴포넌트) 들이 위치할 디렉토리

- containers

: 컴포넌트를 포함하는 상위 개념의 컴포넌트 (라우트에 렌더링할 컴포넌트) 들이 위치할 디렉토리

- reducers

: 액션객체를 전달받아 Redux state 를 업데이트하는 함수가 위치할 디렉토리

- index.js : 리액트 설정 파일 (렌더링 위치, 라우트 등을 지정)

- style.css : 스타일시트


## 비밀번호 암호화 모듈


```

 $ npm install --save pbkdf2-password

```
### module install 

```

$ npm install --save axios react-router-dom react-timeago redux react-redux redux-thunk

```

  * axios : HTTP 요청을 할 수 있도록 도와주는 모듈
    
  * react-router-dom : 클라이언트 사이드 라우터 (* 이전에는 react-router 로 설치했지만 버전업 되면서 브라우저용은 react-router-dom 으로 설치)
    
  * react-timeago : 시간을 얼마나 지났는지 계산해서 나타내는 React 컴포넌트 (3 seconds ago 와 같이)



### webpack css-loader & style-loader install 

```

  $ npm install --save-dev style-loader css-loader

```


```



```


```
에러가 있을경우
yarn add -D babel-core@7.0.0-bridge.0
```