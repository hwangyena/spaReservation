# Itez Next Template for SSR(Server Side Rendering)

프로젝트 시작 시 ~/example 폴더를 전부 제거하신 후 시작하시면 됩니다.

- ## 해당 템플릿은 eslint, prettier를 사용하고 있습니다.

  ### vscode extension에서 eslint, prettier를 설치해 주시고

  ### vscode 설정에서 defaultFormatter: prettier, formatOnSave: true로 설정해주세요.

  <br/>

- ## graphql subscription을 쓰지 않을 경우

```
  npm uninstall bufferutil utf-8-validate
```

## 설치

```
  npm ci
```

## 개발모드 실행

```
  npm run dev
```

## 타입 체크, 문법 검사

```
  npm test
```

## 빌드

```
  npm run build
```

## 빌드파일 실행

```
  npm start
```

## 스키마 생성

```
  npm run generate
```

## 포트 변경(9999번 예시)

### \*npm 방식

```
  PORT=9999 npm run dev
```

```
  PORT=9999 npm start
```

### \*npx 방식

```
  npx next dev -p 9999
```

```
  npx next start -p 9999
```

## dependency

### graphql

- @apollo/client
- apollo-upload-client
- @types/apollo-upload-client
- @graphql-codegen/cli
- @graphql-codegen/typescript

### style

- styled-components
- @types/styled-components
- nprogress
- @types/nprogress
- rc-dialog
- sass
