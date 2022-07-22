## 로컬 파일 불러오기

<br/>

- 브라우저는 유저의 파일 시스템과 격리되어 있다 (자바스크립트 어플리케이션은 유저의 로컬파일을 읽을 수 없음)
- 유저가 파일을 선택했을 경우 브라우저의 메모리 속에 존재하게 되므로 파일 정보를 읽을 수 있다
- 유저가 선택한 파일의 URL을 통해 해당 파일에 접근 가능하다

<br/>

```jsx
//html
<input id='jsFile' type='file' accept='image/*' />;

//js
const fileInput = document.getElementById('jsFile');

function handleFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  console.log(url);
} // blob:http://127.0.0.1...8d6b4

fileInput.addEventListener('change', handleFileChange);
```

<br/>

❗ 여기서 URL은 **해당 이미지에 접근 가능한 브라우저만을 위한 URL**로, 해당 브라우저가 자신의 메모리에 있는 파일을 나타내는 방식! 따라서 해당 이미지에 접근권한이 없는 다른 브라우저에 blob:http://~ 주소를 입력하면 아무것도 뜨지 않음

<br/><br/>

## 이미지 객체 생성

<br/>

- 이미지를 동적으로 제어해야 할 때 `Image(width, height)` 클래스를 이용

  - html 이미지 태그의 **src부분을 url 변수를 통해 동적으로 제어해야 하는 경우**
  - 나중을 위해 이미지를 미리 로딩해두거나 이미지의 크기를 바로 구해야 할 경우

  <br/>

```jsx
const img = new Image();
// 파라미터를 통해 미리 크기 지정도 가능

img.src = 이미지 url 변수;
```

<br/>

- Image 이벤트 핸들러

  - onAbort : 유저가 이미지 로딩을 중간에 멈췄을 경우
  - onError : 이미지 로딩 중 에러가 발생했을 경우
  - onLoad : 이미지 로딩에 성공했을 경우

  <br/><br/>

## `CanvasRenderingContext2D.drawImage(image, x, y, width, height)`

<br/>

- 캔버스 위 원하는 위치에 원하는 크기의 이미지를 나타내기 위한 API

<br/>

```jsx
const img = new Image();
img.src = url;
img.onload = function () {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};
```

<br/><br/>

## `CanvasRenderingContext2D.save()`

- context의 현재 상태(색상, 스타일 등)를 저장함

## `CanvasRenderingContext2D.restore()`

- 가장 최근에 save된 context 상태로 복원

<br/>

```jsx
// html
<input id='jsText' type='text' />;

//js
const textInput = document.getElementById('jsText');

function onDoubleClick(event) {
  ctx.save();
  const text = textInput.value;
  ctx.lineWidth = 1;
  ctx.strokeText(text, event.offsetX, event.offsetY);
  ctx.restore();
}
canvas.addEventListener('dblclick', onDoubleClick);
```

<br/>

❗ `save()` 함수와 `restore()` 함수 사이에서 발생하는 변경내역은 저장되지 않으므로 때에 따라 자유롭게 context의 스타일 수정이 가능한 것

❗ `save()` 함수를 실행하면 **기존에 저장되었던 스타일이 사라지지 않고 새로 저장된 스타일의 이전으로 기억**된다. 따라서 여러개의 스타일을 저장하는 것이 가능!
