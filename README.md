# design-tokens

## (디자이너, 엔지니어를 위한) 사용법

### 웹 (테일윈드 기반)

```jsonc
{
  "color": {
    // ...
    "background": {
      // ...
      "default": "#ffffff"
    },
    // ...
  }
}
```

위와 같이 build/tailwind/global/colors.json 파일이 있다고 가정하면, 키 순서대로 -으로 연결하면 `color-background-default` 가 됩니다. 그리고 테일윈드에서 배경색을 지정하기 위한 프리픽스는 `tw-bg`이므로, 그 둘을 -으로 연결한 `tw-bg-color-background-default`가 최종 클래스가 됩니다.

```typescript
export default function Component() {
  // div의 배경색이 #ffffff 이 됩니다. tailwind/global/colors.json 파일을 참조하세요.
  return <div className="tw-bg-color-background-default">hello world</div>
}
```

#### 자동완성(IntelliSense) 지원

[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 라는 Visual Studio Code 확장을 사용하면 디자인 토큰 기반의 테일윈드 클래스가 자동완성됩니다. 

### 앱 (리액트 네이티브 기반)
```typescript
import {bg} from 'src/design-tokens/react-native/styles'

export default function Component() {
  // div의 배경색이 #ffffff 이 됩니다. react-native/global/styles.ts 파일을 참조하세요.
  return <View styles={[bg.white]} />
}
```

#### 자동완성(IntelliSense) 지원

타입스크립트 타입이 선언되어 있으므로, 자동완성이 지원됩니다.

### 업데이트 방법

새로 추가되거나, 수정된 디자인 토큰을 활용하려면 장착된 design-tokens 서브모듈을 업데이트해야 합니다. 

```sh
git submodule update --remote src/design-tokens
```


### 앱 (리액트 네이티브 인라인 스타일) 예시

준비 중.

## (엔지니어를 위한) 프로젝트에 적용하는 방법

### 웹 (테일윈드)

먼저 서브모듈을 장착하기 위해 다음 명령어를 실행합니다.

```sh
# 이 둘은 처음에만 실행
git submodule add git@github.com:publy-korea/design-tokens.git src/design-tokens
git submodule init

git submodule update
```

적용하고자 하는 프로젝트의 tailwind.config.js를 열고 다음과 같이 수정해주시면 JSX에서 디자인 토큰에서 자동 생성된 테일윈드 클래스를 사용할 수 있습니다.

```javascript
module.exports = {
  // ...
  presets: [
    // ...
    require('./src/design-tokens/tailwind.config.js'), // presets의 제일 마지막에 추가해야 우선 적용됩니다.
  ],
  // ...
};
```

### Troubleshooting

#### Bitbucket Pipeline 에서 서브모듈에 접근하지 못합니다

Bitbucket pipeline이 이 깃허브 저장소에 대한 읽기 권한을 가지고 있지 않아서 그렇습니다. 

1. https://bitbucket.org/publyproduct/{저장소이름}/admin/addon/admin/pipelines/ssh-keys 로 들어가서 ssh 공개 키를 복사하세요.
2. [design-tokens 액세스 키 설정 페이지](https://bitbucket.org/publyproduct/design-tokens/admin/access-keys/) 에 해당 키를 추가해주시면 됩니다.

## (유지보수하는 엔지니어를 위한) 이 저장소에 대한 설명

### 파일

* `tokens.json`: 피그마 플러그인에서 내보내어진 토큰 파일입니다 (디자인 토큰의 첫번째 단계)
* `tokens/global.json`: [tokens-transformer](https://www.npmjs.com/package/token-transformer)에 의해 [style-dictionary](https://www.npmjs.com/package/style-dictionary) 가 읽어들일 수 있는 형태로 변환된 파일입니다. (명령어: `npm run transform`)
* `tailwind/{theme}/{type}.json`: [style-dictionary](https://www.npmjs.com/package/style-dictionary) 에 의해 tailwind.config.js 의 theme에 넘겨줄 수 있는 형태로 변환된 파일입니다. (명령어: `npm run style-dictionary`)
  * 예시: `tailwind/global/colors.json`
  * **직접 수정해서는 안됩니다.**
* `react-native/{theme}/{type}.ts`: [style-dictionary](https://www.npmjs.com/package/style-dictionary) 에 의해 `react-native/{theme}/styles.ts` 가 임포트할 수 있는 형태로 변환된 파일입니다. (명령어: `npm run style-dictionary`)
  * 예시: `react-native/global/colors.ts`
  * **직접 수정해서는 안됩니다.**
* `react-native/{theme}/styles.ts`: `react-native/{theme}/{type}.ts` 를 임포트해서 [republic](https://bitbucket.org/publyproduct/react-native-republic) 과 호환되는 스타일 오브젝트로 만든 파일입니다.

