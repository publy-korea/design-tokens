# design-tokens

## 시작하기 전에
> For _엔지니어_

### 프로젝트 셋팅

npm을 사용해 필요한 패키지를 먼저 설치해주세요.

```sh
# 의존성 설치
npm install
```


## 프로젝트에 적용하는 방법
> For _엔지니어_

### 웹 (Tailwind)

먼저 서브모듈을 장착하기 위해 다음 명령어를 실행합니다.

```sh
# 이 둘은 처음에만 실행
git submodule add git@github.com:publy-korea/design-tokens.git src/design-tokens
git submodule init

git submodule update
```

적용하고자 하는 프로젝트의 `tailwind.config.js`를 열고 다음과 같이 수정해주시면 JSX에서 디자인 토큰에서 자동 생성된 테일윈드 클래스를 사용할 수 있습니다.

```javascript
module.exports = {
  // ...
  presets: [
    // ...
    require('./src/design-tokens/main/web/tailwind-preset.config.js'), // presets의 제일 마지막에 추가해야 우선 적용됩니다.
  ],
  // ...
};
```

### 서브모듈 업데이트

새로 추가되거나, 수정된 디자인 토큰을 활용하려면 장착된 design-tokens 서브모듈을 업데이트해야 합니다. 

```sh
git submodule update --remote src/design-tokens
```

### Troubleshooting

#### Bitbucket Pipeline 에서 서브모듈에 접근하지 못합니다

Bitbucket pipeline이 이 깃허브 저장소에 대한 읽기 권한을 가지고 있지 않아서 그렇습니다. 

1. https://bitbucket.org/publyproduct/{저장소이름}/admin/addon/admin/pipelines/ssh-keys 로 들어가서 ssh 공개 키를 복사하세요.
2. [design-tokens 액세스 키 설정 페이지](https://bitbucket.org/publyproduct/design-tokens/admin/access-keys/) 에 해당 키를 추가해주시면 됩니다.



## 토큰 사용법
> For _디자이너_, _엔지니어_

### 웹 (Tailwind)

```jsonc
// src/tailwind/colors.json
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

위와 같이 src/tailwind/colors.json 파일이 있다고 가정했을 때, 키 순서대로 "-"으로 연결하면 `color-background-default` 가 됩니다. 그리고 테일윈드에서 배경색을 지정하기 위한 prefix는 `tw-bg`이므로, 그 둘을 -으로 연결한 `tw-bg-color-background-default`가 최종 클래스가 됩니다.

```typescript
export default function Component() {
  // div의 배경색이 #ffffff 이 됩니다. src/tailwind/colors.json 파일을 참조하세요.
  return <div className="tw-bg-color-background-default">hello world</div>
}
```

#### 자동완성

[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 라는 Visual Studio Code 확장을 사용하면 디자인 토큰 기반의 테일윈드 클래스가 자동완성됩니다. 



### 앱 (React Native)
```typescript
import {bg} from 'src/design-tokens/main/react-native'

export default function Component() {
  // div의 배경색이 #ffffff 이 됩니다. src/react-native/index.ts 파일을 참조하세요.
  return <View styles={[bg.white]} />
}
```

#### 자동완성

타입스크립트 타입이 선언되어 있으므로, 자동완성이 지원됩니다.


## 아이콘 배포 방법
> For _디자이너_, _엔지니어_

### 플러그인 자동 배포
1. 피그마에 Design System Library > Icon 페이지에 들어가주세요
2. 배포하고자 하는 아이콘을 컨벤션에 맞추어 네이밍 해준 후, `icona-frame` 프레임 내부에 위치시켜주세요.
3. [Icona](https://www.figma.com/community/plugin/1246320822364150095) 플러그인을 실행하여 **깃헙 저장소 주소**와 **API키**를 입력해주세요. (최초 1회)
4. `icona-frame` 프레임 내부의 아이콘들이 전체 인식되었는지 확인 후, **deploy** 버튼을 눌러 PR을 생성해주세요.
5. [design-tokens 저장소](https://github.com/publy-korea/design-tokens)에서 PR을 머지시키면 자동으로 파이프라인이 돌며 각 디자인 시스템에 배포됩니다.

<img width="757" alt="image" src="https://github.com/publy-korea/design-tokens/assets/77144827/5e2d10b9-d3b2-4113-a9a2-87aac66e3c23">

### 파이프라인 수동 배포
`icons.json` 파일에 변경 사항이 없이 파이프라인이 돌지 않을 경우, 매뉴얼하게 실행 가능합니다.
1. 빗버켓의 [design-tokens 저장소 > Pipelines](https://bitbucket.org/publyproduct/design-tokens/pipelines/results/page/1)탭에 들어갑니다.
2. 우측 상단의 **Run Pipeline** 클릭 후, `main` 브랜치를 타겟으로 `custom: deploy-icons` 파이프라인을 실행해줍니다.


## 프로세스에 대한 설명
> For _엔지니어_

### 디자인 토큰 생성

1. 최초 피그마에서 [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) 플러그인을 통해 `tokens.json`이 생성됩니다.
2. [tokens-transformer](https://www.npmjs.com/package/token-transformer)를 통해 1차 가공을 하여 `transformed/{mobile/pc}.json`을 생성합니다. (명령어: `npm run transform`)
3. [style-dictionary](https://www.npmjs.com/package/style-dictionary)를 통해 웹/앱 각 플랫폼에서 사용 가능한 형태로 변환되어 각각 `src/tailwind/{type}.json`, `src/react-native/{type}.ts`를 생성합니다. (명령어: `npm run style-dictionary:{mobile/pc}`)
4. 생성된 파일들은 `main/{platform}/*`를 통해 최종 export되어 각 프로젝트에 맞게 사용됩니다.
5. 위의 과정들은 명령어 `npm run build`로 일괄 실행 가능합니다.

### 아이콘 파이프라인
1. 최초 피그마에서 [Icona](https://www.figma.com/community/plugin/1246320822364150095) 플러그인을 통해 생성된 PR을 머지하면 `.icona/icons.json`이 생성됩니다.
2. 저장소 커밋이 Bitbucket에 미러링 되며 파이프라인(`bitbucket-pipelines.yml`)을 트리거 시킵니다.
3. `icons.json`에 변경 사항이 있을 경우, `src/scripts/icon-to-{platform}.ts` 을 실행시켜 각 플랫폼 형태의 컴포넌트로 변환 후, `icons/{platform}/*`에 생성합니다. (명령어: `npm run transform-icons`)
4. 이후 각 플랫폼 디자인시스템 저장소에 `cp` 후 커밋이 이루어집니다.



## 저장소에 대한 설명
> For _엔지니어_

### 디렉토리
```
.
├── bitbucket-pipelines.yml
├── .icona                // icona 플러그인을 통해 자동 배포된 icon svg 정보들
│   └── icons.json       
├── (icons)               // 스크립트를 통해 자동 생성되는 아이콘 컴포넌트들 - 파이프라인을 통해서만 생성되므로 커밋되지 않음
│   ├── rn
│   └── web
├── main                  // 외부에서 import 가능하도록 일괄 export해주는 디렉토리
│   ├── react-native
│   │   └── ...
│   └── web
│       └── ...
├── src
│   ├── css               // tailwind에 적용하기 위한 css variables
│   │   ├── index.css
│   │   ├── mobile
│   │   │   └── ...
│   │   └── pc
│   │       └── ...
│   ├── react-native      // rn 태그 style에 적용하기 위한 값들
│   │   └── ...
│   ├── scripts           // 파이프라인에서 실행하는 node 스크립트
│   │   └── ...
│   ├── tailwind          // style-dictionary에 의해 tailwind.config.js에 넘겨줄 수 있는 형태로 변환된 파일들
│   │   ├── ...
│   │   └── plugins       // tailwind 커스텀 클래스를 위한 플러그인
│   │       └── ...
│   └── utils
│       ├── style-dictionary-helpers.ts     // style-dictionary config 내부 스크립트
│       └── ...
├── style-dictionary.mobile.ts  // style-dictionary mobile용 config
├── style-dictionary.pc.ts      // style-dictionary PC용 config
├── tokens.json           // 피그마 플러그인에서 내보내어진 토큰 파일 (디자인 토큰의 첫번째 단계)
├── transformed           // tokens-transformer에 의해 style-dictionary가 읽어들일 수 있는 형태로 변환된 파일
│   ├── mobile.json
│   └── pc.json
└── tsconfig.json
```