# design-tokens

## (디자이너, 엔지니어를 위한) 사용법

### 웹 (테일윈드 기반) 예시

```json
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
  // div의 배경색이 #ffffff 이 됩니다. build/tailwind/global/colors.json 파일을 참조하세요.
  return <div className="tw-bg-color-background-default">hello world</div>
}
```

### 앱 (리액트 네이티브 인라인 스타일) 예시

준비 중.

## (엔지니어를 위한) 프로젝트에 적용하는 방법

### 웹 (테일윈드)

먼저 서브모듈을 장착해야 합니다. 프로젝트의 .gitmodules를 열고 다음 내용을 추가합니다.

```
[submodule "src/design-tokens"]
	path = src/design-tokens
	url = git@github.com:publy-korea/design-tokens.git
```

다음 명령어를 실행합니다.

```sh
git submodule init # 처음에만 실행
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

