## `CanvasRenderingContext2D.fillRect(x, y, width, height)`

<br/>

- width와 height에 의해 결정된 사이즈만큼 (x, y)위치에 색칠된 사각형을 그린다

<br/><br/>

## `CanvasRenderingContext2D.fillStyle`

<br/>

- 도형 안의 색을 결정(기본값은 black)

<br/><br/>

### ❌ 문제점 ❌

<br/>

- 획을 긋고 사각형을 그리는 과정에서 기존 획 위에 덮어씌워져 기존 획이 보이지 않게 됨
- `fillRect()` 를 사용하지 않고 `canvas` 자체의 배경색을 변경하는 것으로 수정
