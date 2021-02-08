---
title: DataBase models of eVision v
language_tabs:
  - javascript--node: javascript--node
  - Node.JS: Node.JS
language_clients:
  - javascript--node: ""
  - Node.JS: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="">DataBase models of eVision v</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="http://localhost:4000/api/v1/">http://localhost:4000/api/v1/</a>

<h1 id="-device">Device</h1>

## Get all devices

> Code samples

`GET /Device`

Получение всех доступных устройств

> Example responses

> 200 Response

```json
[
  {
    "video": [
      {
        "resize": "640x480",
        "framerate": "5",
        "protocol": "TCP",
        "crop": ""
      }
    ],
    "motionDetection": [
      {
        "enable": true,
        "threshold": "1"
      }
    ],
    "videoRecording": [
      {
        "enable": false,
        "uri": "rtsp://user:7et4z2186@172.17.2.204"
      }
    ],
    "relay": [
      {
        "enable": true,
        "keepOpenTimeout": "3",
        "type": "3",
        "password": "password",
        "token": "",
        "uri": "",
        "username": "Peter"
      }
    ],
    "trustedID": [
      {
        "enable": false,
        "login": "",
        "password": ""
      }
    ],
    "notif": [
      {
        "enable": false,
        "notifMode": "file"
      }
    ],
    "event": [
      {
        "timeout": "10",
        "time": "7:00-20:00",
        "weekend": true
      }
    ],
    "objectDetection": [
      {
        "enable": true,
        "enableFace": true,
        "enablePerson": true,
        "enableCar": true,
        "enableCarplate": false,
        "objectType": [
          "0",
          "5",
          "6"
        ],
        "liteDetector": false,
        "faceIdentification": true,
        "frontDetector": true,
        "age": false,
        "gender": false,
        "minFaceSize": "10",
        "thresholdFace": "0.9",
        "thresholdPerson": "0.9",
        "thresholdCar": "0.9",
        "requirePerson": false,
        "requireCar": false,
        "autoUpdate": false,
        "useHistory": false,
        "plateTemplate": "^[ABEKMHOPCTYX]\\d{3}[ABEKMHOPCTYX]{2}\\d{2,3}$",
        "enableLogFace": true,
        "enableLogPerson": true,
        "enableLogCar": true,
        "enableLogCarplate": true
      }
    ],
    "webhook": [
      {
        "enable": false,
        "reqType": "POST",
        "sendOID": true,
        "sendON": true,
        "sendDID": true,
        "sendDN": true,
        "sendA": false,
        "uri": ""
      }
    ],
    "cloud": [
      {
        "enable": false
      }
    ],
    "active": true,
    "device": [
      {
        "name": "teta",
        "type": "TETA",
        "uri": "rtsp://user:7et4z2186@172.17.2.205"
      }
    ],
    "id": "7878d54da20e4e5582e81bee4bb799b3",
    "voice": [
      {
        "accessDeniedMessage": "",
        "accessMessage": "",
        "dayGreeting": "Добрый день",
        "dayHour": "11",
        "enable": false,
        "eveningGreeting": "Добрый вечер",
        "eveningHour": "18",
        "morningGreeting": "Доброе утро",
        "morningHour": "6",
        "nightGreeting": "Доброй ночи",
        "nightHour": "0",
        "unknownMessage": "Здравствуйте",
        "uri": ""
      }
    ]
  }
]
```

<h3 id="get-all-devices-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get-all-devices-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Device](#schemadevice)]|false|none|none|
|» video|array|true|none|Параметры видео|
|»» resize|string|false|none|Разрешение|
|»» framerate|string|false|none|Частота кадров|
|»» protocol|string|false|none|Протокол|
|»» crop|string|false|none|Приближение|
|» motionDetection|array|true|none|Детекция движения|
|»» enable|boolean|false|none|Активация|
|»» threshold|string|false|none|Чувствительность|
|» videoRecording|array|true|none|Запись видео|
|»» enable|boolean|false|none|Активация|
|»» uri|string|false|none|Сетевой адрес|
|» relay|array|true|none|Управление замком|
|»» enable|boolean|false|none|Активация|
|»» keepOpenTimeout|string|false|none|Время открытия замка|
|»» type|string|false|none|Тип устройства|
|»» password|string|false|none|Пароль|
|»» token|string|false|none|Токен|
|»» uri|string|false|none|Сетевой адрес|
|»» username|string|false|none|Логин|
|» trustedID|array|true|none|Наличие аккаунта в trustedId|
|»» enable|boolean|false|none|Активация|
|»» login|string|false|none|Логин|
|»» password|string|false|none|Пароль|
|» notif|array|true|none|События на движение и на распознавание|
|»» enable|boolean|false|none|Активация|
|»» notifMode|string|false|none|Тип оповещения|
|» event|array|true|none|График работы управления доступом|
|»» timeout|string|false|none|Частота оповещения|
|»» time|string|false|none|Рабочее время|
|»» weekend|boolean|false|none|Отключение на выходные|
|» objectDetection|array|true|none|Детектор объектов|
|»» enable|boolean|false|none|Активация|
|»» enableFace|boolean|false|none|Активация распознавания лиц|
|»» enablePerson|boolean|false|none|Активация распознавания персон|
|»» enableCar|boolean|false|none|Активация распознавания автотранспорта|
|»» enableCarplate|boolean|false|none|Активация распознавания автомобильных номеров|
|»» objectType|[any]|false|none|Тип объекта|
|»» liteDetector|boolean|false|none|Упрощенный детектор|
|»» faceIdentification|boolean|false|none|Идентификаия лица|
|»» frontDetector|boolean|false|none|Фронтальный детектор|
|»» age|boolean|false|none|Определение возраста|
|»» gender|boolean|false|none|Определение пола|
|»» minFaceSize|string|false|none|Минимальный размер лица|
|»» thresholdFace|string|false|none|Порог обнаружения лица|
|»» thresholdPerson|string|false|none|Порог обнаружения персон|
|»» thresholdCar|string|false|none|Порог обнаружения автотранспорта|
|»» requirePerson|boolean|false|none|Распознавание только на персоне|
|»» requireCar|boolean|false|none|Распознавание номеров только на автотранспорте|
|»» autoUpdate|boolean|false|none|Автодобавление нераспознанных лиц|
|»» useHistory|boolean|false|none|Использование истории|
|»» plateTemplate|string|false|none|Шаблон автомобильного номера|
|»» enableLogFace|boolean|false|none|Журналирование распознавания лиц|
|»» enableLogPerson|boolean|false|none|Журналирование распознавания персон|
|»» enableLogCar|boolean|false|none|Журналирование распознавания автотранспорта|
|»» enableLogCarplate|boolean|false|none|Журналирование распознавания автомобильных номеров|
|» webhook|array|true|none|Параметры webhook|
|»» enable|boolean|false|none|Активация|
|»» reqType|string|false|none|Тип запроса|
|»» sendOID|boolean|false|none|Отправление идентификатора объекта|
|»» sendON|boolean|false|none|Отправление имени объекта|
|»» sendDID|boolean|false|none|Отправление идентификатора устройтства|
|»» sendDN|boolean|false|none|Отправление имени устройства|
|»» sendA|boolean|false|none|Отправление доступа пользователя|
|»» uri|string|false|none|Адрес webhook|
|» cloud|array|true|none|Параметры cloud|
|»» enable|boolean|false|none|Активация|
|» active|boolean|true|none|Состояние активации устройства|
|» device|array|true|none|Настройки устройства|
|»» name|string|false|none|Имя|
|»» type|string|false|none|Тип устройства|
|»» uri|string|false|none|Сетевой адрес|
|» id|string|true|none|id устройства|
|» voice|array|true|none|Голосовой сервис|
|»» accessDeniedMessage|string|false|none|Фраза для лиц без доступа|
|»» accessMessage|string|false|none|Фраза для лиц с доступом|
|»» dayGreeting|string|false|none|Приветствие для дня|
|»» dayHour|string|false|none|Час начала дня|
|»» enable|boolean|false|none|Активация|
|»» eveningGreeting|string|false|none|Приветствие для вечера|
|»» eveningHour|string|false|none|Час начала вечера|
|»» morningGreeting|string|false|none|Приветствие для утра|
|»» morningHour|string|false|none|Час начала утра|
|»» nightGreeting|string|false|none|Привествие для ночи|
|»» nightHour|string|false|none|Дата начала ночи|
|»» unknownMessage|string|false|none|приветствие для нераспознанных лиц|
|»» uri|string|false|none|SIP URI|

<aside class="success">
This operation does not require authentication
</aside>

## Add a new device

> Code samples

`POST /Device`

Добавление нового устройства

> Body parameter

```json
{
  "device": "string",
  "name": "string",
  "url": "string",
  "login": "string",
  "password": "string"
}
```

<h3 id="add-a-new-device-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[NewDevice](#schemanewdevice)|true|Добавление нового устройства|
|» device|body|string|false|Выбор устройства, которое будете использовать|
|» name|body|string|true|Имя для устройства|
|» url|body|string|false|URL устройства|
|» login|body|string|false|Ваш логин|
|» password|body|string|false|Ваш пароль|

> Example responses

<h3 id="add-a-new-device-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|successful operation|None|

<h3 id="add-a-new-device-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Delete device

> Code samples

`DELETE /Device/{device_id}`

Удаление выбранного устройства

<h3 id="delete-device-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id устройства, которое будет удалено|

<h3 id="delete-device-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|device deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-group">Group</h1>

## Get all groups

> Code samples

`GET /Group`

> Example responses

> 200 Response

```json
[
  {
    "name": "first group",
    "id": "0557a27285aa4aaca203b0b97d49186c",
    "date": 1611050471441,
    "person": [
      "09842421223123456"
    ]
  }
]
```

<h3 id="get-all-groups-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get-all-groups-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Group](#schemagroup)]|false|none|none|
|» name|string|true|none|Название группы|
|» id|integer|true|none|id группы|
|» date|integer|true|none|Дата создания группы|
|» person|[any]|false|none|id людей, находящихся в этой группе|

<aside class="success">
This operation does not require authentication
</aside>

## Create a new group

> Code samples

`POST /Group`

Создание новой группы

> Body parameter

```json
{
  "name": "New group",
  "person": [
    "03213245830453423124"
  ]
}
```

<h3 id="create-a-new-group-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[NewGroup](#schemanewgroup)|true|Создание новой группы|
|» name|body|string|true|Название новой группы|
|» person|body|[any]|false|id людей, которых хотите добавить в эту группу|

> Example responses

> 201 Response

```json
{
  "name": "New group",
  "person": [
    "03213245830453423124"
  ],
  "date": 1611050471441,
  "id": "0557a27285aa4aaca203b0b97d49186c"
}
```

<h3 id="create-a-new-group-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|successful operation|[CreatedNewGroup](#schemacreatednewgroup)|

<aside class="success">
This operation does not require authentication
</aside>

## Customize the group

> Code samples

`PATCH /Group/{group_id}`

Редактирование настроек группы

> Body parameter

```json
{
  "name": "string",
  "person": "string"
}
```

<h3 id="customize-the-group-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id группы, которая будет отредактирована|
|body|body|object|false|Изменение настроек группы|

> Example responses

> 200 Response

<h3 id="customize-the-group-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="customize-the-group-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CreatedNewGroup](#schemacreatednewgroup)]|false|none|none|
|» name|string|true|none|Название новой группы|
|» person|[any]|true|none|id людей, которых хотите добавить в эту группу|
|» date|integer|true|none|Дата создания группы|
|» id|integer|true|none|id группы|

<aside class="success">
This operation does not require authentication
</aside>

## Delete group

> Code samples

`DELETE /Group/{group_id}`

Удаление выбранной группы

<h3 id="delete-group-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id группы, которая будет удалена|

<h3 id="delete-group-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|group deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-history">History</h1>

## Get all history

> Code samples

`GET /History`

Получение всей истории

> Example responses

> 200 Response

```json
[
  {
    "date": 0,
    "imageId": "",
    "coord": "",
    "descriptor": [
      0
    ],
    "sourceId": "f43a9aba-5b0b-11eb-ae93-0242ac130002",
    "sourceName": "TETA",
    "objectId": "9f1626df-dc87-4b4d-93a9-ed87b6e76cea",
    "objectName": "Peter",
    "objDescId": "",
    "objectType": 0,
    "objectIdNum": "324564321",
    "gender": "M",
    "age": "24",
    "accuracy": 0,
    "event": 0,
    "movement": 0
  }
]
```

<h3 id="get-all-history-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get-all-history-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[History](#schemahistory)]|false|none|none|
|» date|integer|true|none|Дата|
|» imageId|string|true|none|Идентификатор изображения|
|» coord|string|true|none|Координаты|
|» descriptor|[any]|false|none|Дескриптор|
|» sourceId|string|true|none|Идентификатор источника|
|» sourceName|string|true|none|Имя источника|
|» objectId|string|false|none|Идентификатор объекта|
|» objectName|string|false|none|Имя объекта|
|» objDescId|string|false|none|Идентификатор дескриптора объекта|
|» objectType|integer|true|none|Тип объекта|
|» objectIdNum|string|false|none|Идентификационный номер объекта|
|» gender|string|false|none|Пол объекта|
|» age|string|false|none|Возраст объекта|
|» accuracy|integer|false|none|Точность|
|» event|integer|true|none|Событие|
|» movement|integer|false|none|Наличие движения|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-person">Person</h1>

## Get all persons

> Code samples

`GET /Person`

Получение всех пользователей

> Example responses

> 200 Response

```json
[
  {
    "name": "Robinzon",
    "idNum": "0557a27285aa4aaca203b0b97d49186c",
    "access": [
      "1611050471441"
    ],
    "group": [
      "first group"
    ],
    "ds": [],
    "date": 0,
    "_id": "string"
  }
]
```

<h3 id="get-all-persons-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get-all-persons-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Person](#schemaperson)]|false|none|none|
|» name|string|true|none|Имя персоны|
|» idNum|integer|false|none|Идентификационный номер|
|» access|[any]|false|none|Параметры доступа для персоны|
|» group|[any]|false|none|Группы, к которым относится персона|
|» ds|array|false|none|Дескриптор|
|»» *anonymous*|any|false|none|none|
|» date|integer|false|none|Группы, к которым относится персона|
|» _id|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Create a new person

> Code samples

`POST /Person`

Создание нового пользователя

> Body parameter

```json
{
  "name": "string",
  "idNum": "string",
  "group": "string",
  "access": "string"
}
```

<h3 id="create-a-new-person-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|Добавление нового пользователя|

> Example responses

> 201 Response

```json
{
  "name": "Robinzon",
  "id": "ae56d4bec002447dabf1e38997463ef9",
  "idNum": "002447dabf1e3",
  "group": [
    "test group"
  ],
  "access": [
    "Teta"
  ],
  "date": 1611207809355
}
```

<h3 id="create-a-new-person-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|successful operation|[CreatedNewPerson](#schemacreatednewperson)|

<aside class="success">
This operation does not require authentication
</aside>

## Customize person

> Code samples

`PATCH /Person/{person_id}`

Редактирование пользователя

> Body parameter

```json
{
  "name": "string",
  "group": "string",
  "idNum": "string"
}
```

<h3 id="customize-person-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id персоны, которая будет отредактирована|
|body|body|object|false|Изменение настроек персоны|

> Example responses

> 200 Response

<h3 id="customize-person-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="customize-person-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CreatedNewPerson](#schemacreatednewperson)]|false|none|none|
|» name|string|true|none|Имя новой персоны|
|» id|string|false|none|id персоны|
|» idNum|string|false|none|Идентификационный номер|
|» group|[any]|false|none|Группы, к которым будет добавлена персона|
|» access|[any]|false|none|Выбор доступного устройства для персоны|
|» date|integer|false|none|Дата создания персоны|

<aside class="success">
This operation does not require authentication
</aside>

## Delete person

> Code samples

`DELETE /Person/{person_id}`

Удаление выбранной персоны

<h3 id="delete-person-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id персоны, которая будет удалена|

<h3 id="delete-person-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|person deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-plate">Plate</h1>

## Get all plates

> Code samples

`GET /Plate`

Возвращение всех автомобильных номеров

> Example responses

> 200 Response

```json
[
  {
    "name": "AA065U12RU",
    "access": [
      "admin"
    ],
    "date": 0,
    "_id": "string"
  }
]
```

<h3 id="get-all-plates-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get-all-plates-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Plate](#schemaplate)]|false|none|none|
|» name|string|true|none|Автомобильный номер|
|» access|[any]|false|none|Параметры доступа|
|» date|integer|false|none|Дата создания|
|» _id|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Create a new plate

> Code samples

`POST /Plate`

Добавление нового автомобильного номер

> Body parameter

```json
{
  "name": "string",
  "access": "string"
}
```

<h3 id="create-a-new-plate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|Добавление нового автомобильного номера|

> Example responses

> 201 Response

```json
{
  "name": "HH123E43RU",
  "access": [
    ""
  ]
}
```

<h3 id="create-a-new-plate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|successful operation|[CreatedNewPlate](#schemacreatednewplate)|

<aside class="success">
This operation does not require authentication
</aside>

## Customize plate

> Code samples

`PATCH /Plate/{plate_id}`

Редактирование автомобильного номера

> Body parameter

```json
{
  "name": "string"
}
```

<h3 id="customize-plate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id автомобиля, который будет отредактирован|
|body|body|object|false|Изменение настроек автомобильного номера|

> Example responses

> 200 Response

<h3 id="customize-plate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="customize-plate-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CreatedNewPlate](#schemacreatednewplate)]|false|none|none|
|» name|string|false|none|Автомобильный номер|
|» access|string|false|none|Параметры доступа|

<aside class="success">
This operation does not require authentication
</aside>

## Delete plate

> Code samples

`DELETE /Plate/{plate_id}`

Удаление выбранного автомобильного номера

<h3 id="delete-plate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id автомобильного номера, который будет удален|

> Example responses

> 204 Response

<h3 id="delete-plate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|plate deleted|Inline|

<h3 id="delete-plate-responseschema">Response Schema</h3>

Status Code **204**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Plate](#schemaplate)]|false|none|none|
|» name|string|true|none|Автомобильный номер|
|» access|[any]|false|none|Параметры доступа|
|» date|integer|false|none|Дата создания|
|» _id|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-user">User</h1>

## Get all users

> Code samples

`GET /User`

Возвращение всех юзеров

> Example responses

> 200 Response

```json
[
  {
    "name": "Smith",
    "role": "admin",
    "password": "$2b$10$5UDm9kcu8Ac9NfM3xHVPs.Du1VbPrZajetK79cIrmX8.JIHC.d8g6",
    "id": "9a9ccb75b28c41b69312651348d98e5a",
    "date": 1605191486825
  }
]
```

<h3 id="get-all-users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get-all-users-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|
|» name|string|true|none|Имя юзера|
|» role|string|true|none|Роль юзера|
|» password|string|true|none|Пароль юзера|
|» id|string|false|none|id нового пользователя|
|» date|integer|false|none|Дата создания юзера|

<aside class="success">
This operation does not require authentication
</aside>

## Create a new user

> Code samples

`POST /User`

Создание нового юзера

> Body parameter

```json
{
  "name": "string",
  "role": "string",
  "password": "string"
}
```

<h3 id="create-a-new-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|Добавление нового пользователя|

> Example responses

> 201 Response

```json
{
  "name": "Jack",
  "role": "admin",
  "password": "$2b$10$5UDm9kcu8Ac9NfM3xHVPs.Du1VbPrZajetK79cIrmX8.JIHC.d8g6",
  "id": "fa4e31d74e7346869c593c60b1484677",
  "date": 1605191486825
}
```

<h3 id="create-a-new-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|successful operation|[CreatedNewUser](#schemacreatednewuser)|

<aside class="success">
This operation does not require authentication
</aside>

## Customize user

> Code samples

`PATCH /User/{user_id}`

Редактирование выбранного юзера

> Body parameter

```json
{
  "name": "string",
  "role": "string",
  "password": "string"
}
```

<h3 id="customize-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id юзера, который будет отредактирован|
|body|body|object|false|Изменение настроек юзера|

> Example responses

> 200 Response

<h3 id="customize-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="customize-user-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|
|» name|string|true|none|Имя юзера|
|» role|string|true|none|Роль юзера|
|» password|string|true|none|Пароль юзера|
|» id|string|false|none|id нового пользователя|
|» date|integer|false|none|Дата создания юзера|

<aside class="success">
This operation does not require authentication
</aside>

## Delete user

> Code samples

`DELETE /User/{user_id}`

Удаление выбранного юзера

<h3 id="delete-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id юзера, который будет удален|

> Example responses

> 204 Response

<h3 id="delete-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|user deleted|Inline|

<h3 id="delete-user-responseschema">Response Schema</h3>

Status Code **204**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|
|» name|string|true|none|Имя юзера|
|» role|string|true|none|Роль юзера|
|» password|string|true|none|Пароль юзера|
|» id|string|false|none|id нового пользователя|
|» date|integer|false|none|Дата создания юзера|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-video">Video</h1>

## Get all video

> Code samples

`GET /Video`

Получение всего видео

> Example responses

> 200 Response

```json
[
  {
    "sourceId": "",
    "filename": "",
    "start": 0,
    "end": 0,
    "duration": 0,
    "date": 0,
    "_id": "string"
  }
]
```

<h3 id="get-all-video-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get-all-video-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Video](#schemavideo)]|false|none|none|
|» sourceId|string|false|none|Идентификатор источника|
|» filename|string|false|none|Название файла|
|» start|integer|false|none|Начало видеозаписи|
|» end|string|false|none|Конец видеозаписи|
|» duration|integer|false|none|Длительность видеозаписи|
|» date|integer|false|none|Дата создания|
|» _id|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Device">Device</h2>
<!-- backwards compatibility -->
<a id="schemadevice"></a>
<a id="schema_Device"></a>
<a id="tocSdevice"></a>
<a id="tocsdevice"></a>

```json
{
  "video": [
    {
      "resize": "640x480",
      "framerate": "5",
      "protocol": "TCP",
      "crop": ""
    }
  ],
  "motionDetection": [
    {
      "enable": true,
      "threshold": "1"
    }
  ],
  "videoRecording": [
    {
      "enable": false,
      "uri": "rtsp://user:7et4z2186@172.17.2.204"
    }
  ],
  "relay": [
    {
      "enable": true,
      "keepOpenTimeout": "3",
      "type": "3",
      "password": "password",
      "token": "",
      "uri": "",
      "username": "Peter"
    }
  ],
  "trustedID": [
    {
      "enable": false,
      "login": "",
      "password": ""
    }
  ],
  "notif": [
    {
      "enable": false,
      "notifMode": "file"
    }
  ],
  "event": [
    {
      "timeout": "10",
      "time": "7:00-20:00",
      "weekend": true
    }
  ],
  "objectDetection": [
    {
      "enable": true,
      "enableFace": true,
      "enablePerson": true,
      "enableCar": true,
      "enableCarplate": false,
      "objectType": [
        "0",
        "5",
        "6"
      ],
      "liteDetector": false,
      "faceIdentification": true,
      "frontDetector": true,
      "age": false,
      "gender": false,
      "minFaceSize": "10",
      "thresholdFace": "0.9",
      "thresholdPerson": "0.9",
      "thresholdCar": "0.9",
      "requirePerson": false,
      "requireCar": false,
      "autoUpdate": false,
      "useHistory": false,
      "plateTemplate": "^[ABEKMHOPCTYX]\\d{3}[ABEKMHOPCTYX]{2}\\d{2,3}$",
      "enableLogFace": true,
      "enableLogPerson": true,
      "enableLogCar": true,
      "enableLogCarplate": true
    }
  ],
  "webhook": [
    {
      "enable": false,
      "reqType": "POST",
      "sendOID": true,
      "sendON": true,
      "sendDID": true,
      "sendDN": true,
      "sendA": false,
      "uri": ""
    }
  ],
  "cloud": [
    {
      "enable": false
    }
  ],
  "active": true,
  "device": [
    {
      "name": "teta",
      "type": "TETA",
      "uri": "rtsp://user:7et4z2186@172.17.2.205"
    }
  ],
  "id": "7878d54da20e4e5582e81bee4bb799b3",
  "voice": [
    {
      "accessDeniedMessage": "",
      "accessMessage": "",
      "dayGreeting": "Добрый день",
      "dayHour": "11",
      "enable": false,
      "eveningGreeting": "Добрый вечер",
      "eveningHour": "18",
      "morningGreeting": "Доброе утро",
      "morningHour": "6",
      "nightGreeting": "Доброй ночи",
      "nightHour": "0",
      "unknownMessage": "Здравствуйте",
      "uri": ""
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|video|array|true|none|Параметры видео|
|motionDetection|array|true|none|Детекция движения|
|videoRecording|array|true|none|Запись видео|
|relay|array|true|none|Управление замком|
|trustedID|array|true|none|Наличие аккаунта в trustedId|
|notif|array|true|none|События на движение и на распознавание|
|event|array|true|none|График работы управления доступом|
|objectDetection|array|true|none|Детектор объектов|
|webhook|array|true|none|Параметры webhook|
|cloud|array|true|none|Параметры cloud|
|active|boolean|true|none|Состояние активации устройства|
|device|array|true|none|Настройки устройства|
|id|string|true|none|id устройства|
|voice|array|true|none|Голосовой сервис|

<h2 id="tocS_VideoParams">VideoParams</h2>
<!-- backwards compatibility -->
<a id="schemavideoparams"></a>
<a id="schema_VideoParams"></a>
<a id="tocSvideoparams"></a>
<a id="tocsvideoparams"></a>

```json
{
  "resize": "640x480",
  "framerate": "5",
  "protocol": "TCP",
  "crop": ""
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|resize|string|false|none|Разрешение|
|framerate|string|false|none|Частота кадров|
|protocol|string|false|none|Протокол|
|crop|string|false|none|Приближение|

<h2 id="tocS_MotionDetection">MotionDetection</h2>
<!-- backwards compatibility -->
<a id="schemamotiondetection"></a>
<a id="schema_MotionDetection"></a>
<a id="tocSmotiondetection"></a>
<a id="tocsmotiondetection"></a>

```json
{
  "enable": true,
  "threshold": "1"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|
|threshold|string|false|none|Чувствительность|

<h2 id="tocS_VideoRecording">VideoRecording</h2>
<!-- backwards compatibility -->
<a id="schemavideorecording"></a>
<a id="schema_VideoRecording"></a>
<a id="tocSvideorecording"></a>
<a id="tocsvideorecording"></a>

```json
{
  "enable": false,
  "uri": "rtsp://user:7et4z2186@172.17.2.204"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|
|uri|string|false|none|Сетевой адрес|

<h2 id="tocS_Relay">Relay</h2>
<!-- backwards compatibility -->
<a id="schemarelay"></a>
<a id="schema_Relay"></a>
<a id="tocSrelay"></a>
<a id="tocsrelay"></a>

```json
{
  "enable": true,
  "keepOpenTimeout": "3",
  "type": "3",
  "password": "password",
  "token": "",
  "uri": "",
  "username": "Peter"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|
|keepOpenTimeout|string|false|none|Время открытия замка|
|type|string|false|none|Тип устройства|
|password|string|false|none|Пароль|
|token|string|false|none|Токен|
|uri|string|false|none|Сетевой адрес|
|username|string|false|none|Логин|

<h2 id="tocS_TrustedID">TrustedID</h2>
<!-- backwards compatibility -->
<a id="schematrustedid"></a>
<a id="schema_TrustedID"></a>
<a id="tocStrustedid"></a>
<a id="tocstrustedid"></a>

```json
{
  "enable": false,
  "login": "",
  "password": ""
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|
|login|string|false|none|Логин|
|password|string|false|none|Пароль|

<h2 id="tocS_MotionDetectionForNotif">MotionDetectionForNotif</h2>
<!-- backwards compatibility -->
<a id="schemamotiondetectionfornotif"></a>
<a id="schema_MotionDetectionForNotif"></a>
<a id="tocSmotiondetectionfornotif"></a>
<a id="tocsmotiondetectionfornotif"></a>

```json
{
  "enable": false,
  "notifMode": "file"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|
|notifMode|string|false|none|Тип оповещения|

<h2 id="tocS_EventParams">EventParams</h2>
<!-- backwards compatibility -->
<a id="schemaeventparams"></a>
<a id="schema_EventParams"></a>
<a id="tocSeventparams"></a>
<a id="tocseventparams"></a>

```json
{
  "timeout": "10",
  "time": "7:00-20:00",
  "weekend": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|timeout|string|false|none|Частота оповещения|
|time|string|false|none|Рабочее время|
|weekend|boolean|false|none|Отключение на выходные|

<h2 id="tocS_ObjectDetectionParams">ObjectDetectionParams</h2>
<!-- backwards compatibility -->
<a id="schemaobjectdetectionparams"></a>
<a id="schema_ObjectDetectionParams"></a>
<a id="tocSobjectdetectionparams"></a>
<a id="tocsobjectdetectionparams"></a>

```json
{
  "enable": true,
  "enableFace": true,
  "enablePerson": true,
  "enableCar": true,
  "enableCarplate": false,
  "objectType": [
    "0",
    "5",
    "6"
  ],
  "liteDetector": false,
  "faceIdentification": true,
  "frontDetector": true,
  "age": false,
  "gender": false,
  "minFaceSize": "10",
  "thresholdFace": "0.9",
  "thresholdPerson": "0.9",
  "thresholdCar": "0.9",
  "requirePerson": false,
  "requireCar": false,
  "autoUpdate": false,
  "useHistory": false,
  "plateTemplate": "^[ABEKMHOPCTYX]\\d{3}[ABEKMHOPCTYX]{2}\\d{2,3}$",
  "enableLogFace": true,
  "enableLogPerson": true,
  "enableLogCar": true,
  "enableLogCarplate": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|
|enableFace|boolean|false|none|Активация распознавания лиц|
|enablePerson|boolean|false|none|Активация распознавания персон|
|enableCar|boolean|false|none|Активация распознавания автотранспорта|
|enableCarplate|boolean|false|none|Активация распознавания автомобильных номеров|
|objectType|[any]|false|none|Тип объекта|
|liteDetector|boolean|false|none|Упрощенный детектор|
|faceIdentification|boolean|false|none|Идентификаия лица|
|frontDetector|boolean|false|none|Фронтальный детектор|
|age|boolean|false|none|Определение возраста|
|gender|boolean|false|none|Определение пола|
|minFaceSize|string|false|none|Минимальный размер лица|
|thresholdFace|string|false|none|Порог обнаружения лица|
|thresholdPerson|string|false|none|Порог обнаружения персон|
|thresholdCar|string|false|none|Порог обнаружения автотранспорта|
|requirePerson|boolean|false|none|Распознавание только на персоне|
|requireCar|boolean|false|none|Распознавание номеров только на автотранспорте|
|autoUpdate|boolean|false|none|Автодобавление нераспознанных лиц|
|useHistory|boolean|false|none|Использование истории|
|plateTemplate|string|false|none|Шаблон автомобильного номера|
|enableLogFace|boolean|false|none|Журналирование распознавания лиц|
|enableLogPerson|boolean|false|none|Журналирование распознавания персон|
|enableLogCar|boolean|false|none|Журналирование распознавания автотранспорта|
|enableLogCarplate|boolean|false|none|Журналирование распознавания автомобильных номеров|

<h2 id="tocS_Webhook">Webhook</h2>
<!-- backwards compatibility -->
<a id="schemawebhook"></a>
<a id="schema_Webhook"></a>
<a id="tocSwebhook"></a>
<a id="tocswebhook"></a>

```json
{
  "enable": false,
  "reqType": "POST",
  "sendOID": true,
  "sendON": true,
  "sendDID": true,
  "sendDN": true,
  "sendA": false,
  "uri": ""
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|
|reqType|string|false|none|Тип запроса|
|sendOID|boolean|false|none|Отправление идентификатора объекта|
|sendON|boolean|false|none|Отправление имени объекта|
|sendDID|boolean|false|none|Отправление идентификатора устройтства|
|sendDN|boolean|false|none|Отправление имени устройства|
|sendA|boolean|false|none|Отправление доступа пользователя|
|uri|string|false|none|Адрес webhook|

<h2 id="tocS_Cloud">Cloud</h2>
<!-- backwards compatibility -->
<a id="schemacloud"></a>
<a id="schema_Cloud"></a>
<a id="tocScloud"></a>
<a id="tocscloud"></a>

```json
{
  "enable": false
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Активация|

<h2 id="tocS_DeviceParams">DeviceParams</h2>
<!-- backwards compatibility -->
<a id="schemadeviceparams"></a>
<a id="schema_DeviceParams"></a>
<a id="tocSdeviceparams"></a>
<a id="tocsdeviceparams"></a>

```json
{
  "name": "teta",
  "type": "TETA",
  "uri": "rtsp://user:7et4z2186@172.17.2.205"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|Имя|
|type|string|false|none|Тип устройства|
|uri|string|false|none|Сетевой адрес|

<h2 id="tocS_VoiceParams">VoiceParams</h2>
<!-- backwards compatibility -->
<a id="schemavoiceparams"></a>
<a id="schema_VoiceParams"></a>
<a id="tocSvoiceparams"></a>
<a id="tocsvoiceparams"></a>

```json
{
  "accessDeniedMessage": "",
  "accessMessage": "",
  "dayGreeting": "Добрый день",
  "dayHour": "11",
  "enable": false,
  "eveningGreeting": "Добрый вечер",
  "eveningHour": "18",
  "morningGreeting": "Доброе утро",
  "morningHour": "6",
  "nightGreeting": "Доброй ночи",
  "nightHour": "0",
  "unknownMessage": "Здравствуйте",
  "uri": ""
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|accessDeniedMessage|string|false|none|Фраза для лиц без доступа|
|accessMessage|string|false|none|Фраза для лиц с доступом|
|dayGreeting|string|false|none|Приветствие для дня|
|dayHour|string|false|none|Час начала дня|
|enable|boolean|false|none|Активация|
|eveningGreeting|string|false|none|Приветствие для вечера|
|eveningHour|string|false|none|Час начала вечера|
|morningGreeting|string|false|none|Приветствие для утра|
|morningHour|string|false|none|Час начала утра|
|nightGreeting|string|false|none|Привествие для ночи|
|nightHour|string|false|none|Дата начала ночи|
|unknownMessage|string|false|none|приветствие для нераспознанных лиц|
|uri|string|false|none|SIP URI|

<h2 id="tocS_NewDevice">NewDevice</h2>
<!-- backwards compatibility -->
<a id="schemanewdevice"></a>
<a id="schema_NewDevice"></a>
<a id="tocSnewdevice"></a>
<a id="tocsnewdevice"></a>

```json
{
  "device": "string",
  "name": "string",
  "url": "string",
  "login": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|device|string|false|none|Выбор устройства, которое будете использовать|
|name|string|true|none|Имя для устройства|
|url|string|false|none|URL устройства|
|login|string|false|none|Ваш логин|
|password|string|false|none|Ваш пароль|

<h2 id="tocS_Group">Group</h2>
<!-- backwards compatibility -->
<a id="schemagroup"></a>
<a id="schema_Group"></a>
<a id="tocSgroup"></a>
<a id="tocsgroup"></a>

```json
{
  "name": "first group",
  "id": "0557a27285aa4aaca203b0b97d49186c",
  "date": 1611050471441,
  "person": [
    "09842421223123456"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Название группы|
|id|integer|true|none|id группы|
|date|integer|true|none|Дата создания группы|
|person|[any]|false|none|id людей, находящихся в этой группе|

<h2 id="tocS_NewGroup">NewGroup</h2>
<!-- backwards compatibility -->
<a id="schemanewgroup"></a>
<a id="schema_NewGroup"></a>
<a id="tocSnewgroup"></a>
<a id="tocsnewgroup"></a>

```json
{
  "name": "New group",
  "person": [
    "03213245830453423124"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Название новой группы|
|person|[any]|false|none|id людей, которых хотите добавить в эту группу|

<h2 id="tocS_CreatedNewGroup">CreatedNewGroup</h2>
<!-- backwards compatibility -->
<a id="schemacreatednewgroup"></a>
<a id="schema_CreatedNewGroup"></a>
<a id="tocScreatednewgroup"></a>
<a id="tocscreatednewgroup"></a>

```json
{
  "name": "New group",
  "person": [
    "03213245830453423124"
  ],
  "date": 1611050471441,
  "id": "0557a27285aa4aaca203b0b97d49186c"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Название новой группы|
|person|[any]|true|none|id людей, которых хотите добавить в эту группу|
|date|integer|true|none|Дата создания группы|
|id|integer|true|none|id группы|

<h2 id="tocS_History">History</h2>
<!-- backwards compatibility -->
<a id="schemahistory"></a>
<a id="schema_History"></a>
<a id="tocShistory"></a>
<a id="tocshistory"></a>

```json
{
  "date": 0,
  "imageId": "",
  "coord": "",
  "descriptor": [
    0
  ],
  "sourceId": "f43a9aba-5b0b-11eb-ae93-0242ac130002",
  "sourceName": "TETA",
  "objectId": "9f1626df-dc87-4b4d-93a9-ed87b6e76cea",
  "objectName": "Peter",
  "objDescId": "",
  "objectType": 0,
  "objectIdNum": "324564321",
  "gender": "M",
  "age": "24",
  "accuracy": 0,
  "event": 0,
  "movement": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|date|integer|true|none|Дата|
|imageId|string|true|none|Идентификатор изображения|
|coord|string|true|none|Координаты|
|descriptor|[any]|false|none|Дескриптор|
|sourceId|string|true|none|Идентификатор источника|
|sourceName|string|true|none|Имя источника|
|objectId|string|false|none|Идентификатор объекта|
|objectName|string|false|none|Имя объекта|
|objDescId|string|false|none|Идентификатор дескриптора объекта|
|objectType|integer|true|none|Тип объекта|
|objectIdNum|string|false|none|Идентификационный номер объекта|
|gender|string|false|none|Пол объекта|
|age|string|false|none|Возраст объекта|
|accuracy|integer|false|none|Точность|
|event|integer|true|none|Событие|
|movement|integer|false|none|Наличие движения|

<h2 id="tocS_Person">Person</h2>
<!-- backwards compatibility -->
<a id="schemaperson"></a>
<a id="schema_Person"></a>
<a id="tocSperson"></a>
<a id="tocsperson"></a>

```json
{
  "name": "Robinzon",
  "idNum": "0557a27285aa4aaca203b0b97d49186c",
  "access": [
    "1611050471441"
  ],
  "group": [
    "first group"
  ],
  "ds": [],
  "date": 0,
  "_id": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Имя персоны|
|idNum|integer|false|none|Идентификационный номер|
|access|[any]|false|none|Параметры доступа для персоны|
|group|[any]|false|none|Группы, к которым относится персона|
|ds|array|false|none|Дескриптор|
|date|integer|false|none|Группы, к которым относится персона|
|_id|string|false|none|none|

<h2 id="tocS_CreatedNewPerson">CreatedNewPerson</h2>
<!-- backwards compatibility -->
<a id="schemacreatednewperson"></a>
<a id="schema_CreatedNewPerson"></a>
<a id="tocScreatednewperson"></a>
<a id="tocscreatednewperson"></a>

```json
{
  "name": "Robinzon",
  "id": "ae56d4bec002447dabf1e38997463ef9",
  "idNum": "002447dabf1e3",
  "group": [
    "test group"
  ],
  "access": [
    "Teta"
  ],
  "date": 1611207809355
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Имя новой персоны|
|id|string|false|none|id персоны|
|idNum|string|false|none|Идентификационный номер|
|group|[any]|false|none|Группы, к которым будет добавлена персона|
|access|[any]|false|none|Выбор доступного устройства для персоны|
|date|integer|false|none|Дата создания персоны|

<h2 id="tocS_Plate">Plate</h2>
<!-- backwards compatibility -->
<a id="schemaplate"></a>
<a id="schema_Plate"></a>
<a id="tocSplate"></a>
<a id="tocsplate"></a>

```json
{
  "name": "AA065U12RU",
  "access": [
    "admin"
  ],
  "date": 0,
  "_id": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Автомобильный номер|
|access|[any]|false|none|Параметры доступа|
|date|integer|false|none|Дата создания|
|_id|string|false|none|none|

<h2 id="tocS_CreatedNewPlate">CreatedNewPlate</h2>
<!-- backwards compatibility -->
<a id="schemacreatednewplate"></a>
<a id="schema_CreatedNewPlate"></a>
<a id="tocScreatednewplate"></a>
<a id="tocscreatednewplate"></a>

```json
{
  "name": "HH123E43RU",
  "access": [
    ""
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|Автомобильный номер|
|access|string|false|none|Параметры доступа|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "name": "Smith",
  "role": "admin",
  "password": "$2b$10$5UDm9kcu8Ac9NfM3xHVPs.Du1VbPrZajetK79cIrmX8.JIHC.d8g6",
  "id": "9a9ccb75b28c41b69312651348d98e5a",
  "date": 1605191486825
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Имя юзера|
|role|string|true|none|Роль юзера|
|password|string|true|none|Пароль юзера|
|id|string|false|none|id нового пользователя|
|date|integer|false|none|Дата создания юзера|

<h2 id="tocS_CreatedNewUser">CreatedNewUser</h2>
<!-- backwards compatibility -->
<a id="schemacreatednewuser"></a>
<a id="schema_CreatedNewUser"></a>
<a id="tocScreatednewuser"></a>
<a id="tocscreatednewuser"></a>

```json
{
  "name": "Jack",
  "role": "admin",
  "password": "$2b$10$5UDm9kcu8Ac9NfM3xHVPs.Du1VbPrZajetK79cIrmX8.JIHC.d8g6",
  "id": "fa4e31d74e7346869c593c60b1484677",
  "date": 1605191486825
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|Имя человека, которого хотите добавить|
|role|string|false|none|Роль для нового юзера|
|password|string|false|none|Пароль|
|id|string|false|none|id юзера|
|date|integer|false|none|Дата создания юзера|

<h2 id="tocS_Video">Video</h2>
<!-- backwards compatibility -->
<a id="schemavideo"></a>
<a id="schema_Video"></a>
<a id="tocSvideo"></a>
<a id="tocsvideo"></a>

```json
{
  "sourceId": "",
  "filename": "",
  "start": 0,
  "end": 0,
  "duration": 0,
  "date": 0,
  "_id": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sourceId|string|false|none|Идентификатор источника|
|filename|string|false|none|Название файла|
|start|integer|false|none|Начало видеозаписи|
|end|string|false|none|Конец видеозаписи|
|duration|integer|false|none|Длительность видеозаписи|
|date|integer|false|none|Дата создания|
|_id|string|false|none|none|

