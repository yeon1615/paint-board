## Array.from()

<br/>

- 유사 배열 객체(array-like object) 혹은 이터러블 객체를 얕게 복사해 새로운 배열을 만든다

<br/><br/>

## forEach

<br/>

- 기존의 **for문을 대체**하는 고차함수
- 배열의 요소를 **순회**하며 콜백함수를 수행
- `forEach((item, index, arr) => {})`

```jsx
const nums = [1, 2, 3, 4, 5];
let total = 0;

nums.forEach((item) => {
  total += item;
});
console.log(total); // 15 출력
```

<br/><br/>

## 💡 HTMLCollection과 Nodelist

<br/>

✔document 객체와 element를 가져오는 메서드들의 반환값 타입

<br/>

| 메서드                             | 반환값         |
| ---------------------------------- | -------------- |
| getElementById('아이디')           | Element        |
| querySelector('선택자')            | Element        |
| getElementsByClassName('클래스명') | HTMLCollection |
| getElementsByTagName('태그명')     | HTMLCollection |
| getElementsByName('name속성자값')  | Nodelist       |
| querySelectorAll('선택자')         | Nodelist       |

<br/>

✔ HTMLCollection과 Nodelist는 DOM API가 여러개의 결과값을 반환하기 위한 DOM 컬렉션 객체로, 모두 **유사배열객체(array-like object)** 이다

<br/>

- 유사배열객체란? - index와 length 프로퍼티를 가지며 [배열]과 유사한 생김새를 가진 객체
- `Array.isArray(유사배열객체)` 메서드를 이용하면 false값을 얻는다
- 배열의 기본 메서드를 사용할 수 없으므로 `Array.from(유사배열객체)` 를 이용해 **배열로 변환하여 사용**

  ❗ Nodelist는 유사배열이지만 `forEach` 메서드는 사용가능 (map, filter등은 사용불가능하므로 배열 변환 권장)

  <br/><br/>

## **`<input type="color">`**

<br/>

- `value` 속성을 이용해 기본값을 지정할 수 있다 (설정하지 않을 시 #000000)
- `change` 와 `input` 이벤트를 통해 값의 변화 감지 가능

<br/><br/>

## HTML `data-` 속성

<br/>

- 특정한 데이터를 DOM요소에 저장해두기 위한 속성
- 속성명은 `data-원하는 value` 형식이지만, 사용자에 의해 임의로 지정된 속성이므로 HTML 표준 속성인 `value` 속성과는 별개

<br/>

### 💡 자바스크립트에서 접근하기

<br/>

- `dataset` 객체를 통해 접근가능
- 속성 이름의 `data-` 뒷부분을 사용해 접근한다
- 대쉬로 연결된 속성명은 camelCase로 변환됨

<br/>

```jsx
// HTML //
<div id='color' data-color='#1abc9c'></div>;

//JavaScript//
const color = document.getElementById('color');
color.dataset.color; // '#1abc9c'
```
