# Todo List - Node.js & Fetch API

간단한 `Node.js` 백엔드와 `Vanilla JavaScript` 프론트엔드를 사용해 **Todo List CRUD 기능**을 구현한 프로젝트입니다.

## 기술 스택

- **Node.js** (내장 `http` 모듈 기반 서버)
- **HTML / CSS / JavaScript**
- **Fetch API**
- **CORS 설정**



## 기능 설명

| 기능     | 설명 |
|----------|------|
| ✅ Create | 새로운 Todo 추가 |
| 📃 Read   | Todo 목록 조회 |
| ✏️ Update | 텍스트 수정 기능 |
| ❌ Delete | Todo 삭제 기능 |
| 🔄 Checkbox | 완료 여부 체크 (UI 상태 반영) |


## 프로젝트 구조

```
project-root/
│
├── server.js            # Node.js 서버 파일
├── index.html           # 클라이언트 HTML
├── todo.js              # 클라이언트 자바스크립트 (CRUD 동작)
```


## 실행 방법

### 1. 서버 실행 (Node.js)

```bash
node server.js
````

서버는 기본적으로 [http://localhost:3000](http://localhost:3000) 에서 실행됩니다.

### 2. 클라이언트 열기

1. VSCode에서 `index.html` 파일을 열고 Live Server 확장 기능으로 실행하거나,
2. 브라우저에서 `index.html`을 더블 클릭하여 열 수 있습니다.

**주의:** `CORS` 설정은 `http://127.0.0.1:5500` 도메인에만 허용되어 있습니다.
Live Server 또는 `localhost:5500` 포트를 사용하는 환경에서 열어주세요.

## 주요 포인트

* `fetch()`를 통한 비동기 HTTP 요청
* `server.js`에서 GET, POST, PUT, DELETE 메서드 직접 구현
* 프론트엔드와 백엔드의 완전한 통신 구조를 학습할 수 있음
* 요청/응답 이후 DOM을 다시 렌더링하여 실시간 UI 반영

## 개선 아이디어

* `localStorage` 연동으로 클라이언트 데이터 유지
* `done` 상태를 서버에 반영하도록 기능 확장
* 프론트엔드를 React 등으로 마이그레이션
