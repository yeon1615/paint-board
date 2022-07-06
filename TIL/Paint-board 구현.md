### HTML <canvas>요소

<br/>

- 스크립트를 이용해 그래픽 컨텐츠를 그릴 때 사용
- `canvas` 요소는 그래픽 컨텐츠를 위한 컨테이너일 뿐, 실제 동작은 스크립트를 사용해 구현해야 함
- `canvas` 태그 안의 텍스트는 브라우저가 캔버스를 지원하지 않을 경우 화면에 나타남
- `getContext` 메서드를 이용해 렌더링 컨텍스트와 그리기 함수를 사용할 수 있음
  ❗ **context** - **요소 안에서 픽셀을 다루는 방법**
  ```jsx
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  // context변수를 만들어 접근하면 됨
  ```
  ❗ 캔버스 API 참고 [https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

<br/>

❗ CSS를 이용해 캔버스 크기를 수정할 경우 렌더링 과정에서 최종 그래픽이 변형될 수 있음.  `width`와 `height` 특성을 통해 **직접 크기를 조절**하는 것이 좋다! HTML 혹은 JS로 변경 가능

```html
<canvas id="canvas" width="300" height="300"> 대체 텍스트 </canvas>
```

<br/><br/>

## 마우스 이벤트 종류

<br/>

1. `click` 해당 요소를 클릭했을 때(**눌렀다가 떼었을 때**)
2. `mousedown` 해당 요소에서 마우스 버튼을 **눌렀을 때**
3. `mouseup` 해당 요소에서 눌렀던 마우스 버튼을 **떼었을 때**
4. `dbclick` 해당 요소에서 더블클릭 했을 때
5. `mousemove` 해당 요소 내에서 마우스를 움직였을 때
6. `mouseover` 마우스를 해당 요소 바깥에서 안으로 옮겼을 때 (자식요소 포함)
7. `mouseout` 마우스를 해당 요소 안에서 바깥으로 옮겼을 때 (자식요소 포함)
8. `mouseenter` **마우스를 해당 요소 바깥에서 안으로 옮겼을 때 (본인 요소만 해당)**
9. `mouseleave` **마우스를 해당 요소 안에서 바깥으로 옮겼을 때 (본인 요소만 해당)**
10. `contextmenu` 마우스 오른쪽 버튼을 눌렀을 때

<br/><br/>

## 💡 mouseOver/Out, mouseEnter/Leave 차이

<br/>

- mouseOver/Out - 본인 요소뿐만 아니라 자식요소의 영역까지 포함
- mouseEnter/Leave - 자식요소는 제외, 본인 요소의 영역에만 해당됨

<br/><br/>

## 마우스 움직임 감지해 그림그리기

<br/>

1. `mousedown` 상태일 때 그리기 시작
2. `mousemove` 이벤트의 offset좌표와, `CanvasRenderingContext2D` 의 메서드를 이용해 그림그리기
   - `offsetX,Y` **이벤트 대상 객체가 기준**(해당 박스의 왼쪽 모서리 좌표가 0)
   - `clientX,Y` **브라우저 전체 범위가 기준** (해당 페이지의 상단이 0)
3. `mouseup` 혹은 `mouseleave` 상태가 되면 그리기 중지

<br/><br/>

## CanvasRenderingContext2D 의 메서드를 이용해 선 그리기

<br/>

1. `beginPath()` 를 통해 **새로운 경로 시작**
2. `moveTo(x,y)` 를 통해 경로의 **시작점의 좌표를 이동**
3. `linTo(x,y)` 를 이용, `moveTo()` 메서드로 옮겨진 경로의 **마지막 좌표를 지정된 좌표에 직선으로 연결**
4. `strokeStyle` 와 `lineWidth` 의 값을 통해 원하는 스타일 설정
5. `stroke()` 를 통해 경로를 해당 스타일의 획으로 그을 수 있음

<br/><br/>

## 💡요소의 크기에 대한 속성(좌표X)

<br/>

### 1. Offset

<br/>

- 화면에 보여지는 **요소의 전체영역**
  - `offsetParent` 요소의 부모의 전체영역
    - 가장 가까운 부모요소, 즉 position 프로퍼티가 설정되어있는 요소를 기준으로 함
    - 가장 가까운 부모요소가 설정되어있지 않을 경우 가장 가까운 `<tb><th><table>` 혹은 `<body>`가 기준이 된다
  - `offsetLeft` offsetParent를 기준으로 오른쪽으로 얼마나 떨어져있는지
  - `offsetTop` offsetParent를 기준으로 아래쪽으로 얼마나 떨어져있는지
  - `offsetWidth, offsetHeight` 테두리를 포함해 요소 전체가 차지하는 너비와 높이

<br/>

### 2. Client

<br/>

- 요소의 border영역(메인이 아닌 손님의 영역)
  - `clientLeft, clientTop` 요소 제일 밖을 감싸는 영역과 요소 안(content+padding)을 감싸는 영역 사이의 거리
    - 일반적으로 왼쪽 border의 너비, 위쪽 border의 너비와 같음(좌우, 상하 스크롤이 존재할 경우 해당 너비 포함)
  - `clientHeight, clientWidth` 요소의 border안의 영역 사이즈 정보 (padding값 포함, 스크롤바 너비 제외)
    - 즉, css상의 높이 + padding값 - 스크롤바의 너비

<br/>

### 3. Scroll

<br/>

- `scrollWidth, scrollHeight` clientWidth와 clientHeight에서 스크롤로 감춰진 영역을 포함한 값 (스크롤바가 없다면 clientWidth,Height와 같은 값을 갖게 됨)
- `scrollLeft, scrollTop` 스크롤바의 움직임으로 인해 가려지는 요소의 너비와 높이
