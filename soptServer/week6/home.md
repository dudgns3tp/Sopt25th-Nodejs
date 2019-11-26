## 취향이 비슷한 사람들의 책 조회

| 메소드 | 경로                   | 짧은 설명   |
| ------ | ---------------------- | ----------- |
| GET    | /book/{username}| 취향이 비슷한 조회 |

### 요청 헤더

```json
Content-Type: application/json
```

### 응답 바디

#### 취향이 비슷한 사람의 책 조회 성공

```json
{
    "status": 200,
    "message": "취향이 비슷한 사람의 책 조회 성공!",
    "data":[
        {
            "bookName":"호준이형 안드존잘",
            "author" :"호준이형",
	        "bookCover":"C:/Users/USER/Documents/Server_Android/public/images/11.jpg",
	        "star":"1",
            "scrap":"TRUE"
        },

        {
           "bookName":"호준이형 안드존잘(오해의 소지가 있음)",
            "author" :"호준이형",
	       "bookCover":"C:/Users/USER/Documents/Server_Android/public/images/11.jpg",
	       "star":"4.9",
	       "scrap":"TRUE"
        }
	]

}
```
####  조회 실패

```json
{
    "status": 404,
    "message": "취향이 비슷한 사람이 없습니다.",
    "data": null
}
```
#### INTERNAL SERVER ERROR

```json
{
    "status": 500,
    "message": "서버 내부 에러",
    "data": null
}
```
------