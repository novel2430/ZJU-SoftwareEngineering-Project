# ZJU Software Engineering Project [CustomerService Module]

## API Documentation

### Outline
#### - Base URL
```
HTTP base : https://yejsgk.top/back/demo2
Websocket base : wss://yejsgk.top/back/demo2
```
#### - HTTP Endpoint
| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/login-test` | `POST` | 登入 |
| `/api/service/data` | `GET` | 获取客服个人信息 |
| `/api/service/chat/get/all` | `GET` | 获取客服所有的聊天详细纪录 |
| `/api/service/chat/get/equal` | `GET` | 获取客服聊天详细纪录，等于查询 |
| `/api/service/chat/get/more` | `GET` | 获取客服聊天详细纪录，大于查询 |
| `/api/service/chat/get/less` | `GET` | 获取客服聊天详细纪录，小于查询 |
| `/api/service/chatroom/get/titles` | `GET` | 获取客服所有的聊天室信息 |
| `/api/service/chatroom/get/content` | `GET` | 获取客服某一聊天室的聊天纪录 |
| `/api/patient/chatroom/get/titles` | `GET` | 获取病人所有的聊天室信息 |
| `/api/patient/chatroom/get/content` | `GET` | 获取病人某一聊天室的聊天纪录 |
| `/api/patient/chatroom/upload/new-chat` | `POST` | 病人新增一个聊天室 |
| `/api/patient/chatroom/delete/chat` | `POST` | 病人删除一个聊天室 |

#### - Websocket Endpoint
| Endpoint | Description |
| -------- | ----------- |
| `/chat/service` | 客服进入聊天室 |
| `/chat/patient` | 病人进入聊天室 |

### HTTP Endponts Details
#### - 登入
**Endpoint**: `/login-test`

**Method**: `GET`

**Parameters**:
```
{
    username: "<username>",
    password: "<password>"
    type: "<type>" // "service" or "patient"
}
```

**Response**:
```
{
    // 1:success, 0:failed
    state: 1
}
```

**Example**:
```js
const res = await this.$http.post(url, {
    username: this.username,
    password: this.password,
    type: this.type,
})
```

::Description

#### - 获取客服个人信息
**Endpoint**: `/api/service/data`

**Method**: `GET`

**Parameters**: None

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: {
        id: 1,
        name: "some-name",
        phone: "some-phone",
        mail: "some-mail",
    }
}
```

**Example**:
```js
    const res = await this.$http.get(url)
```

::Description

#### - 获取客服所有的聊天详细纪录
**Endpoint**: ``/api/service/chat/get/all``

**Method**: `GET`

**Parameters**: None

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            patient_id: 1,
            patient_name: "David",
            start_time: "2020-03-24 12:23:45",
            end_time: "2020-03-24 12:30:31",
            star: 3
        },
        {
            patient_id: 2,
            patient_name: "Tommy",
            start_time: "2020-04-24 11:43:45",
            end_time: "2020-05-24 12:30:38",
            star: 5
        },
        ...
    ]
}
```

**Example**:
```js
    const res = await this.$http.get(url)
```

::Description

#### - 获取客服聊天详细纪录，``等于``查询
**Endpoint**: ``/api/service/chat/get/equal``

**Method**: `GET`

**Parameters**:
```
{
    // search-type : "id", "name", "start_time", "end_time", "star"
    // for "start_time", "end_time" : "YYYY-MM-DD HH:MM:SS"
    search-type: '',
    value:
}
```

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            patient_id: 1,
            patient_name: "David",
            start_time: "2020-03-24 12:23:45",
            end_time: "2020-03-24 12:30:31",
            star: 3
        },
        {
            patient_id: 2,
            patient_name: "Tommy",
            start_time: "2020-04-24 11:43:45",
            end_time: "2020-05-24 12:30:38",
            star: 5
        },
        ...
    ]
}
```

**Example**:
```js
const res = await this.$http.get(url,{
    params: {
        'search-type': this.searchType,
        'value': value,
    }
})
```

::Description


#### - 获取客服聊天详细纪录，``大于``查询
**Endpoint**: ``/api/service/chat/get/more``

**Method**: `GET`

**Parameters**:
```
{
    // search-type : "id", "name", "start_time", "end_time", "star"
    // for "start_time", "end_time" : "YYYY-MM-DD HH:MM:SS"
    search-type: '',
    value:
}
```

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            patient_id: 1,
            patient_name: "David",
            start_time: "2020-03-24 12:23:45",
            end_time: "2020-03-24 12:30:31",
            star: 3
        },
        {
            patient_id: 2,
            patient_name: "Tommy",
            start_time: "2020-04-24 11:43:45",
            end_time: "2020-05-24 12:30:38",
            star: 5
        },
        ...
    ]
}
```

**Example**:
```js
const res = await this.$http.get(url,{
    params: {
        'search-type': this.searchType,
        'value': value,
    }
})
```

::Description


#### - 获取客服聊天详细纪录，``小于``查询
**Endpoint**: ``/api/service/chat/get/less``

**Method**: `GET`

**Parameters**:
```
{
    // search-type : "id", "name", "start_time", "end_time", "star"
    // for "start_time", "end_time" : "YYYY-MM-DD HH:MM:SS"
    search-type: '',
    value:
}
```

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            patient_id: 1,
            patient_name: "David",
            start_time: "2020-03-24 12:23:45",
            end_time: "2020-03-24 12:30:31",
            star: 3
        },
        {
            patient_id: 2,
            patient_name: "Tommy",
            start_time: "2020-04-24 11:43:45",
            end_time: "2020-05-24 12:30:38",
            star: 5
        },
        ...
    ]
}
```

**Example**:
```js
const res = await this.$http.get(url,{
    params: {
        'search-type': this.searchType,
        'value': value,
    }
})
```

::Description

#### - 获取客服所有的聊天室信息
**Endpoint**: ``/api/service/chatroom/get/titles``

**Method**: `GET`

**Parameters**: None

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            chatId:,
            startTime:,
            title:
        },
        {
            chatId:,
            startTime:,
            title:
        },
        ...
    ]
}
```

**Example**:
```js
    const res = await this.$http.get(url)
```

::Description

#### - 获取客服某一聊天室的聊天纪录
**Endpoint**: ``/api/service/chatroom/get/content``

**Method**: `GET`

**Parameters**:
```
{
    // <id> means chatId
    id: ,
}
```

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            content: "hellloooooo",
            from: "service",
            to: "patient",
            time: "2020-03-24 12:30:31",
        },
        {
            content: "Okkkkk",
            from: "patient",
            to: "service",
            time: "2020-03-24 12:31:21",
        },
        ...
    ]
}
```

**Example**:
```js
var res = await this.$http.get(url,{
    params:{
        'id': this.currentChatId,
    }
})
```

::Description

#### - 获取病人所有的聊天室信息
**Endpoint**: ``/api/patient/chatroom/get/titles``

**Method**: `GET`

**Parameters**: None

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            chatId:,
            startTime:,
            title:
        },
        {
            chatId:,
            startTime:,
            title:
        },
        ...
    ]
}
```

**Example**:
```js
    const res = await this.$http.get(url)
```

::Description

#### - 获取病人某一聊天室的聊天纪录
**Endpoint**: ``/api/patient/chatroom/get/content``

**Method**: `GET`

**Parameters**:
```
{
    // <id> means chatId
    id: ,
}
```

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
    content: [
        {
            content: "hellloooooo",
            from: "service",
            to: "patient",
            time: "2020-03-24 12:30:31",
        },
        {
            content: "Okkkkk",
            from: "patient",
            to: "service",
            time: "2020-03-24 12:31:21",
        },
        ...
    ]
}
```

**Example**:
```js
var res = await this.$http.get(url,{
    params:{
        'id': this.currentChatId,
    }
})
```

::Description

#### - 病人新增一个聊天室 (发起提问)
**Endpoint**: ``/api/patient/chatroom/upload/new-chat``

**Method**: `POST`

**Parameters**:
```
{
    // <content> means chatroom title
    // time : "YYYY-MM-DD HH:MM:SS" 
    content: "My head is hurt, how can I do?",
    time: "2026-04-14 12:31:21",
}
```

**Response**:
```
{
    // 1:success, 0:failed
    // if(state==1 && content==null) -> no service online
    state: 1,
    content: <new chatroom ID>
}
```

**Example**:
```js
var res = await this.$http.post(url, {
    content : this.newTitle,
    time: this.getNowDate()
})
```

::Description

#### - 病人删除一个聊天室 (结束提问)
**Endpoint**: ``/api/patient/chatroom/delete/chat``

**Method**: `POST`

**Parameters**:
```
{
    // star >= 0 && star <= 5
    // time : "YYYY-MM-DD HH:MM:SS" 
    star: 4,
    time: "2026-06-11 10:31:21",
}
```

**Response**:
```
{
    // 1:success, 0:failed
    state: 1,
}
```

**Example**:
```js
var res = await this.$http.post(url, {
    star : this.star,
    time: this.getNowDate()
})
```

::Description
