# PLAYLIST
자신의 유튜브 재생목록을 공유합니다.

### 사용 기술

* React, Redux, immutable.js, redux-pender
* youtube OAuth2.0, Data Api v3
* Koa.js, MongoDB, passport, jwt

### redux 구조

![리덕스 구조 사진](./redux.png)

* user: 유저 정보, 로그인 상태
* playList: 내 재생목록, 전체 또는 카테고리 재생목록, 유튜브 플레이어 정보
* base: UI 변경 시에 사용
* pender: 비동기 작업 시 사용