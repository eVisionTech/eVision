## Modules

<dl>
<dt><a href="#module_Auth">Auth</a></dt>
<dd><p>Роуты для аутентификации</p>
</dd>
<dt><a href="#module_Control">Control</a></dt>
<dd><p>Роуты для запуска устройства</p>
</dd>
<dt><a href="#module_DataSocket">DataSocket</a></dt>
<dd><p>Роут для подключения клиента к серверу (передача сообщений)</p>
</dd>
<dt><a href="#module_Collection">Collection</a></dt>
<dd><p>Роуты для экспорта и импорта коллекций</p>
</dd>
<dt><a href="#module_Media">Media</a></dt>
<dd></dd>
<dt><a href="#module_Relay">Relay</a> ⇒ <code>void</code></dt>
<dd><p>Выполняет открытие замка/двери по id устройства в зависимости от его типа (device_type)</p>
</dd>
<dt><a href="#module_Reports">Reports</a></dt>
<dd><p>Подгрузка отчетов из БД</p>
</dd>
<dt><a href="#module_Scan">Scan</a></dt>
<dd><p>Сканирование камер</p>
</dd>
<dt><a href="#module_Settings">Settings</a></dt>
<dd><p>Управление настройками программы</p>
</dd>
<dt><a href="#module_Store">Store</a></dt>
<dd><p>Загрузка медиа и аудио файлов</p>
</dd>
<dt><a href="#module_SystemInformation">SystemInformation</a></dt>
<dd><p>Вывод информационного окна о системе</p>
</dd>
<dt><a href="#module_Version">Version</a></dt>
<dd><p>Проверка и обновление версии программы</p>
</dd>
<dt><a href="#module_GetVideo">GetVideo</a></dt>
<dd><p>Получение видео с устройства</p>
</dd>
<dt><a href="#module_WebHook">WebHook</a></dt>
<dd></dd>
<dt><a href="#module_WebSocket">WebSocket</a> ⇒ <code>object</code></dt>
<dd><p>Установка соединения сервера и клиента</p>
</dd>
</dl>

<a name="module_Auth"></a>

## Auth
Роуты для аутентификации

**Requires**: <code>module:express</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| params | <code>object</code> | параметры |


* [Auth](#module_Auth)
    * [~get/(path)](#module_Auth..get/)
    * [~get/api/v1/Login(path)](#module_Auth..get/api/v1/Login)
    * [~get/api/v1/Status(path)](#module_Auth..get/api/v1/Status)
    * [~get/api/v1/Logout(path)](#module_Auth..get/api/v1/Logout)
    * [~post/api/v1/Update/Start(path)](#module_Auth..post/api/v1/Update/Start)
    * [~post/api/v1/Restart(path)](#module_Auth..post/api/v1/Restart)

<a name="module_Auth..get/"></a>

### Auth~get/(path)
Вход на домашнюю страницу

**Kind**: inner method of [<code>Auth</code>](#module_Auth)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Auth..get/api/v1/Login"></a>

### Auth~get/api/v1/Login(path)
Проверка пользователя на аутентификацию

**Kind**: inner method of [<code>Auth</code>](#module_Auth)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Auth..get/api/v1/Status"></a>

### Auth~get/api/v1/Status(path)
Статус сессии

**Kind**: inner method of [<code>Auth</code>](#module_Auth)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Auth..get/api/v1/Logout"></a>

### Auth~get/api/v1/Logout(path)
Выход из учетки на домашнюю страницу

**Kind**: inner method of [<code>Auth</code>](#module_Auth)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Auth..post/api/v1/Update/Start"></a>

### Auth~post/api/v1/Update/Start(path)
Уведомление о состоянии обновления докера

**Kind**: inner method of [<code>Auth</code>](#module_Auth)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Auth..post/api/v1/Restart"></a>

### Auth~post/api/v1/Restart(path)
Перезагрузка страницы

**Kind**: inner method of [<code>Auth</code>](#module_Auth)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Control"></a>

## Control
Роуты для запуска устройства

**Requires**: <code>module:express</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| startNode | <code>function</code> | Запуск устройства |
| stopNode | <code>function</code> | Остановка устройства |
| restartNode | <code>function</code> | Перезагрузка устройства |


* [Control](#module_Control)
    * [~post/api/v1/Node/Start(path)](#module_Control..post/api/v1/Node/Start)
    * [~post/api/v1/Node/Stop(path)](#module_Control..post/api/v1/Node/Stop)
    * [~post/api/v1/Node/Restart(path)](#module_Control..post/api/v1/Node/Restart)

<a name="module_Control..post/api/v1/Node/Start"></a>

### Control~post/api/v1/Node/Start(path)
Старт устройства

**Kind**: inner method of [<code>Control</code>](#module_Control)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Control..post/api/v1/Node/Stop"></a>

### Control~post/api/v1/Node/Stop(path)
Остановка устройства

**Kind**: inner method of [<code>Control</code>](#module_Control)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Control..post/api/v1/Node/Restart"></a>

### Control~post/api/v1/Node/Restart(path)
Перезагрузка устройства

**Kind**: inner method of [<code>Control</code>](#module_Control)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_DataSocket"></a>

## DataSocket
Роут для подключения клиента к серверу (передача сообщений)

**Requires**: [<code>WebSocket</code>](#module_WebSocket)  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>\*</code> |  |
| conf | <code>object</code> | порт, на котором сервер прослушивает клиентские запросы |

<a name="module_Collection"></a>

## Collection
Роуты для экспорта и импорта коллекций

**Requires**: <code>module:express</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>object</code> | параметры |


* [Collection](#module_Collection)
    * [~exportCollection(app, res, collections, folders)](#module_Collection..exportCollection) ⇒ <code>void</code>
    * [~importCollection(app, req, res, collections)](#module_Collection..importCollection) ⇒ <code>object</code>
    * [~checkFiles(path, collections)](#module_Collection..checkFiles) ⇒ <code>Promise</code>
    * [~checkVersion(temp, collections)](#module_Collection..checkVersion) ⇒ <code>Promise</code>
    * [~transformCSV(csvFiles, types, temp, collections)](#module_Collection..transformCSV) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~readSource(file)](#module_Collection..readSource) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~b64ToFloatArray(str)](#module_Collection..b64ToFloatArray) ⇒ <code>Array.&lt;string&gt;</code>
    * [~transformJson(obj, temp)](#module_Collection..transformJson) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~post/api/v1/Export/:exportType(path)](#module_Collection..post/api/v1/Export/_exportType) ⇒ <code>void</code>
    * [~post/api/v1/Import/:importType(path, upload)](#module_Collection..post/api/v1/Import/_importType) ⇒ <code>void</code>

<a name="module_Collection..exportCollection"></a>

### Collection~exportCollection(app, res, collections, folders) ⇒ <code>void</code>
Экспорт коллекции из БД

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| res | <code>object</code> | обработчик ответов |
| collections | <code>object</code> | коллекции |
| folders | <code>Array.&lt;string&gt;</code> | место экспорта коллекции |

<a name="module_Collection..importCollection"></a>

### Collection~importCollection(app, req, res, collections) ⇒ <code>object</code>
Импорт коллекции в БД

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| req | <code>object</code> | файл для импорта |
| res | <code>function</code> | обработчик ответов |
| collections | <code>object</code> | коллекции |

<a name="module_Collection..checkFiles"></a>

### Collection~checkFiles(path, collections) ⇒ <code>Promise</code>
Проверка соответствия импортируемых файлов типу импортирования

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь до коллеций |
| collections | <code>Array.&lt;string&gt;</code> | имя коллекций |

<a name="module_Collection..checkVersion"></a>

### Collection~checkVersion(temp, collections) ⇒ <code>Promise</code>
Проверка расширения файла

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| temp | <code>string</code> | путь |
| collections | <code>Array.&lt;string&gt;</code> | коллекции |

<a name="module_Collection..transformCSV"></a>

### Collection~transformCSV(csvFiles, types, temp, collections) ⇒ <code>Promise.&lt;void&gt;</code>
Трансформация csv файла в json

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| csvFiles | <code>object</code> | файлы, который нужно трансформировать |
| types | <code>Array.&lt;string&gt;</code> | типы файлов, которые нужно трансформировать |
| temp | <code>string</code> | путь |
| collections | <code>Array.&lt;string&gt;</code> | коллекции |

<a name="module_Collection..readSource"></a>

### Collection~readSource(file) ⇒ <code>Promise.&lt;void&gt;</code>
Чтение файла

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>object</code> | файл, из которого необходимо извлечь имя |

<a name="module_Collection..b64ToFloatArray"></a>

### Collection~b64ToFloatArray(str) ⇒ <code>Array.&lt;string&gt;</code>
Преобразование b64 строки в Float64

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  
**Returns**: <code>Array.&lt;string&gt;</code> - - массив данных  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | строка для хранения в Float64Array |

<a name="module_Collection..transformJson"></a>

### Collection~transformJson(obj, temp) ⇒ <code>Promise.&lt;void&gt;</code>
Трансформация json файла

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | объект данных |
| temp | <code>string</code> | путь |

<a name="module_Collection..post/api/v1/Export/_exportType"></a>

### Collection~post/api/v1/Export/:exportType(path) ⇒ <code>void</code>
Экспорт коллекций в зависимости от типа

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Collection..post/api/v1/Import/_importType"></a>

### Collection~post/api/v1/Import/:importType(path, upload) ⇒ <code>void</code>
Импорт коллекций в зависимости от типа

**Kind**: inner method of [<code>Collection</code>](#module_Collection)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
| upload | <code>method</code> | формат для обработки |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Media"></a>

## Media

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>object</code> | параметры |
| detectors | <code>object</code> | детекторы |
| streamers |  |  |


* [Media](#module_Media)
    * _static_
        * [.newID()](#module_Media.newID) ⇒ <code>string</code>
        * [.preview()](#module_Media.preview) ⇒ <code>object</code>
    * _inner_
        * [~get/api/v1/Stream/:id](#module_Media..get/api/v1/Stream/_id)
        * [~allowedTime(params)](#module_Media..allowedTime) ⇒ <code>boolean</code>
        * [~onFrameComplete(data, ctx)](#module_Media..onFrameComplete)
        * [~writeFrame(data)](#module_Media..writeFrame) ⇒ <code>Array.&lt;string&gt;</code>
        * [~loadImage(buff, id)](#module_Media..loadImage) ⇒ <code>string</code>

<a name="module_Media.newID"></a>

### Media.newID() ⇒ <code>string</code>
Генерация UUID

**Kind**: static method of [<code>Media</code>](#module_Media)  
**Returns**: <code>string</code> - - созданный id  
<a name="module_Media.preview"></a>

### Media.preview() ⇒ <code>object</code>
Захват изображения и выгрузка его в буфер

**Kind**: static method of [<code>Media</code>](#module_Media)  
<a name="module_Media..get/api/v1/Stream/_id"></a>

### Media~get/api/v1/Stream/:id
Трансляция видео

**Kind**: inner property of [<code>Media</code>](#module_Media)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>module</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Media..allowedTime"></a>

### Media~allowedTime(params) ⇒ <code>boolean</code>
Проверка: входит ли текущее время во время получения доступа к замку устройства

**Kind**: inner method of [<code>Media</code>](#module_Media)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>string</code> | параметры события |

<a name="module_Media..onFrameComplete"></a>

### Media~onFrameComplete(data, ctx)
Получение ответа от сервера детекции

**Kind**: inner method of [<code>Media</code>](#module_Media)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | - |
| ctx | <code>object</code> | передаваемый объект |

<a name="module_Media..writeFrame"></a>

### Media~writeFrame(data) ⇒ <code>Array.&lt;string&gt;</code>
Отображение кадра

**Kind**: inner method of [<code>Media</code>](#module_Media)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | данные кадра |

<a name="module_Media..loadImage"></a>

### Media~loadImage(buff, id) ⇒ <code>string</code>
Загрузка изображения

**Kind**: inner method of [<code>Media</code>](#module_Media)  

| Param | Type | Description |
| --- | --- | --- |
| buff | <code>object</code> | путь до загруженного изображения |
| id | <code>number</code> | id изображения |

<a name="module_Relay"></a>

## Relay ⇒ <code>void</code>
Выполняет открытие замка/двери по id устройства в зависимости от его типа (device_type)


| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>object</code> | параметры |

<a name="module_Reports"></a>

## Reports
Подгрузка отчетов из БД


| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>object</code> | параметры |


* [Reports](#module_Reports)
    * [~get/api/v1/Report/Person(path)](#module_Reports..get/api/v1/Report/Person) ⇒ <code>object</code>
    * [~get/api/v1/Report/Group(path)](#module_Reports..get/api/v1/Report/Group) ⇒ <code>object</code>
    * [~get/api/v1/Report/Device(path)](#module_Reports..get/api/v1/Report/Device) ⇒ <code>object</code>
    * [~get/api/v1/Report/Unique(path)](#module_Reports..get/api/v1/Report/Unique) ⇒ <code>object</code>
    * [~get/api/v1/Report/TimeTracking(path, middleware)](#module_Reports..get/api/v1/Report/TimeTracking) ⇒ <code>object</code>
    * [~get/api/v1/Report/Visitors(path, middleware)](#module_Reports..get/api/v1/Report/Visitors) ⇒ <code>object</code>

<a name="module_Reports..get/api/v1/Report/Person"></a>

### Reports~get/api/v1/Report/Person(path) ⇒ <code>object</code>
Подгрузка отчетов по человеку

**Kind**: inner method of [<code>Reports</code>](#module_Reports)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Reports..get/api/v1/Report/Group"></a>

### Reports~get/api/v1/Report/Group(path) ⇒ <code>object</code>
Подгрузка отчетов по группам

**Kind**: inner method of [<code>Reports</code>](#module_Reports)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Reports..get/api/v1/Report/Device"></a>

### Reports~get/api/v1/Report/Device(path) ⇒ <code>object</code>
Подгрузка отчетов по девайсу

**Kind**: inner method of [<code>Reports</code>](#module_Reports)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Reports..get/api/v1/Report/Unique"></a>

### Reports~get/api/v1/Report/Unique(path) ⇒ <code>object</code>
Подгрузка отчетов по дате, по источнику, по порядку сортировки, по скипу и по лимиту (для постраничного отображения в таблице на фронте)

**Kind**: inner method of [<code>Reports</code>](#module_Reports)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Reports..get/api/v1/Report/TimeTracking"></a>

### Reports~get/api/v1/Report/TimeTracking(path, middleware) ⇒ <code>object</code>
Подгрузка отчета по определенному периоду времени

**Kind**: inner method of [<code>Reports</code>](#module_Reports)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
| middleware | <code>callback</code> | функция для обработки запроса |

<a name="module_Reports..get/api/v1/Report/Visitors"></a>

### Reports~get/api/v1/Report/Visitors(path, middleware) ⇒ <code>object</code>
Подгрузка отчетов по посещениям

**Kind**: inner method of [<code>Reports</code>](#module_Reports)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
| middleware | <code>callback</code> | функция для обработки запроса |

<a name="module_Scan"></a>

## Scan
Сканирование камер

**Requires**: <code>module:node-onvif</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |

<a name="module_Scan..get/api/v1/DeviceScanner"></a>

### Scan~get/api/v1/DeviceScanner(path) ⇒ <code>object</code>
Поиск подходящих камер

**Kind**: inner method of [<code>Scan</code>](#module_Scan)  
**Returns**: <code>object</code> - - список доступных камер  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Settings"></a>

## Settings
Управление настройками программы


| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>Object</code> | настройки программы |
| save | <code>function</code> | функция сохранения измнений настройки |


* [Settings](#module_Settings)
    * [~get/api/v1/Settings(path)](#module_Settings..get/api/v1/Settings) ⇒ <code>object</code>
    * [~patch/api/v1/Settings(path)](#module_Settings..patch/api/v1/Settings) ⇒ <code>object</code>

<a name="module_Settings..get/api/v1/Settings"></a>

### Settings~get/api/v1/Settings(path) ⇒ <code>object</code>
Получение данных настройки

**Kind**: inner method of [<code>Settings</code>](#module_Settings)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Settings..patch/api/v1/Settings"></a>

### Settings~patch/api/v1/Settings(path) ⇒ <code>object</code>
Внесение изменений данных настройки

**Kind**: inner method of [<code>Settings</code>](#module_Settings)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_Store"></a>

## Store
Загрузка медиа и аудио файлов


| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>Object</code> | Параметры |


* [Store](#module_Store)
    * [~getFilePaths(folderPath)](#module_Store..getFilePaths) ⇒ <code>Array.&lt;string&gt;</code>
    * [~getFilePaths(files)](#module_Store..getFilePaths) ⇒ <code>object</code>
    * [~saveImage(buffer, coord, id, name, access, cb)](#module_Store..saveImage) ⇒ <code>void</code>
    * [~cbUploadPhoto(req, res)](#module_Store..cbUploadPhoto) ⇒ <code>void</code>
    * [~uploadPhotos(files, temp, next)](#module_Store..uploadPhotos) ⇒ <code>void</code>
    * [~post/api/v1/Upload/Photo(path, uploadPhoto, cbUploadPhoto)](#module_Store..post/api/v1/Upload/Photo)
    * [~post/api/v1/Upload/Archive(path, uploadArchive)](#module_Store..post/api/v1/Upload/Archive)
    * [~post/api/v1/Upload/Audio(path, uploadAudio)](#module_Store..post/api/v1/Upload/Audio)
    * [~post/api/v1/Upload/Logo(path, uploadLogo)](#module_Store..post/api/v1/Upload/Logo)

<a name="module_Store..getFilePaths"></a>

### Store~getFilePaths(folderPath) ⇒ <code>Array.&lt;string&gt;</code>
Получение пути файла

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| folderPath | <code>Array.&lt;stirng&gt;</code> | путь |

<a name="module_Store..getFilePaths"></a>

### Store~getFilePaths(files) ⇒ <code>object</code>
Проверка файлов на расширение

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>Array.&lt;stirng&gt;</code> | массив файлов |

<a name="module_Store..saveImage"></a>

### Store~saveImage(buffer, coord, id, name, access, cb) ⇒ <code>void</code>
Сохранение изображения

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>string</code> | путь |
| coord | <code>Array.&lt;string&gt;</code> | размеры изображения |
| id | <code>string</code> | id пользователя |
| name | <code>string</code> | имя пользователя |
| access | <code>Array.&lt;stirng&gt;</code> | доступ |
| cb | <code>function</code> | callback function |

<a name="module_Store..cbUploadPhoto"></a>

### Store~cbUploadPhoto(req, res) ⇒ <code>void</code>
Получение изображения с фронта в буфере

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | обработчик запроса |
| res | <code>object</code> | обработчик ответа |

<a name="module_Store..uploadPhotos"></a>

### Store~uploadPhotos(files, temp, next) ⇒ <code>void</code>
Получение множества (архив) изображения с фронта в буфере

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>object</code> | фотографии для загрузки |
| temp | <code>string</code> | путь |
| next |  | - |

<a name="module_Store..post/api/v1/Upload/Photo"></a>

### Store~post/api/v1/Upload/Photo(path, uploadPhoto, cbUploadPhoto)
Загрузка изображения

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
| uploadPhoto |  | обработчик на принятие файла с именем "fileData", который будет сохранен в req.file |
| cbUploadPhoto | <code>function</code> | получение изображения с фронта в буфер |

<a name="module_Store..post/api/v1/Upload/Archive"></a>

### Store~post/api/v1/Upload/Archive(path, uploadArchive)
Загрузка архива изображений

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
| uploadArchive |  | обработчик на принятие файла с именем "fileData", который будет сохранен в req.file |
|  | <code>function</code> | функция для обработки запроса |

<a name="module_Store..post/api/v1/Upload/Audio"></a>

### Store~post/api/v1/Upload/Audio(path, uploadAudio)
Загрузка аудиофайла

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
| uploadAudio |  | обработчик на принятие файла с именем "fileData", который будет сохранен в req.file |
|  | <code>function</code> | функция для обработки запроса |

<a name="module_Store..post/api/v1/Upload/Logo"></a>

### Store~post/api/v1/Upload/Logo(path, uploadLogo)
Загрузка лого

**Kind**: inner method of [<code>Store</code>](#module_Store)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
| uploadLogo |  | обработчик на принятие файла с именем "fileData", который будет сохранен в req.file |
|  | <code>function</code> | функция для обработки запроса |

<a name="module_SystemInformation"></a>

## SystemInformation
Вывод информационного окна о системе

**Requires**: <code>module:systeminformation</code>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |

<a name="module_SystemInformation..getInfo"></a>

### SystemInformation~getInfo(showWarning, showDanger) ⇒ <code>object</code>
Информация о нагрузке системы

**Kind**: inner method of [<code>SystemInformation</code>](#module_SystemInformation)  
**Returns**: <code>object</code> - - информация о нагрузке системы  

| Param | Type | Description |
| --- | --- | --- |
| showWarning | <code>boolean</code> | наличие окна "warningDisplayed" |
| showDanger | <code>boolean</code> | наличие окна "dangerDisplayed" |

<a name="module_Version"></a>

## Version
Проверка и обновление версии программы


| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>object</code> | настройки программы |


* [Version](#module_Version)
    * [~versionCompare(left, right)](#module_Version..versionCompare) ⇒ <code>number</code>
    * [~post/api/v1/CheckVersion(path)](#module_Version..post/api/v1/CheckVersion) ⇒ <code>object</code>
    * [~post/api/v1/Update(path)](#module_Version..post/api/v1/Update) ⇒ <code>Object</code>

<a name="module_Version..versionCompare"></a>

### Version~versionCompare(left, right) ⇒ <code>number</code>
Функция сравнения версий

**Kind**: inner method of [<code>Version</code>](#module_Version)  
**Returns**: <code>number</code> - - "1", "0" , "-1"  

| Param | Type | Description |
| --- | --- | --- |
| left | <code>string</code> | версия обновления |
| right | <code>string</code> | версия текущей программы |

<a name="module_Version..post/api/v1/CheckVersion"></a>

### Version~post/api/v1/CheckVersion(path) ⇒ <code>object</code>
Проверка версии программы

**Kind**: inner method of [<code>Version</code>](#module_Version)  
**Returns**: <code>object</code> - - наличие новой версии  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция промежуточной обработки |

<a name="module_Version..post/api/v1/Update"></a>

### Version~post/api/v1/Update(path) ⇒ <code>Object</code>
Обновление версии программы

**Kind**: inner method of [<code>Version</code>](#module_Version)  
**Returns**: <code>Object</code> - - успешность завершения обновления  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция промежуточной обработки |

<a name="module_GetVideo"></a>

## GetVideo
Получение видео с устройства


| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | Инстанс http сервера |

<a name="module_GetVideo..get/api/v1/Video/_id"></a>

### GetVideo~get/api/v1/Video/:id(path) ⇒ <code>Array.&lt;string&gt;</code>
Вывод списка видео определенного устройства

**Kind**: inner method of [<code>GetVideo</code>](#module_GetVideo)  
**Returns**: <code>Array.&lt;string&gt;</code> - - список видео  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция промежуточной обработки |

<a name="module_WebHook"></a>

## WebHook

| Param | Type | Description |
| --- | --- | --- |
| app | <code>module</code> | HTTP server |
| conf | <code>object</code> | параметры |
| detectors | <code>\*</code> |  |


* [WebHook](#module_WebHook)
    * _static_
        * [.newID()](#module_WebHook.newID) ⇒ <code>string</code>
        * [.newID()](#module_WebHook.newID) ⇒ <code>string</code>
    * _inner_
        * [~post/Subscribe(path)](#module_WebHook..post/Subscribe) ⇒ <code>object</code>
        * [~api/api/v1/syncBewardDb(path)](#module_WebHook..api/api/v1/syncBewardDb)

<a name="module_WebHook.newID"></a>

### WebHook.newID() ⇒ <code>string</code>
Генерация UUID

**Kind**: static method of [<code>WebHook</code>](#module_WebHook)  
**Returns**: <code>string</code> - - созданный id  
<a name="module_WebHook.newID"></a>

### WebHook.newID() ⇒ <code>string</code>
Генерация UUID

**Kind**: static method of [<code>WebHook</code>](#module_WebHook)  
**Returns**: <code>string</code> - - созданный id  
<a name="module_WebHook..post/Subscribe"></a>

### WebHook~post/Subscribe(path) ⇒ <code>object</code>
Поддержка получения сообщений, отправленных домофоном серии Beward TFR

**Kind**: inner method of [<code>WebHook</code>](#module_WebHook)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_WebHook..api/api/v1/syncBewardDb"></a>

### WebHook~api/api/v1/syncBewardDb(path)
Синхронизация с Beward TFR

**Kind**: inner method of [<code>WebHook</code>](#module_WebHook)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | путь |
|  | <code>callback</code> | функция для обработки запроса |

<a name="module_WebSocket"></a>

## WebSocket ⇒ <code>object</code>
Установка соединения сервера и клиента

**Requires**: [<code>WebSocket</code>](#module_WebSocket)  

| Param | Type | Description |
| --- | --- | --- |
| server | <code>object</code> | HTTP server |
| params | <code>object</code> | параметры события |
| detectors | <code>object</code> | детекторы |


* [WebSocket](#module_WebSocket) ⇒ <code>object</code>
    * [~onMessage(message)](#module_WebSocket..onMessage) ⇒ <code>boolean</code>
    * [~onConnection(ws, req)](#module_WebSocket..onConnection) ⇒ <code>object</code>
    * [~autoUpdate(buffer, _log, name)](#module_WebSocket..autoUpdate) ⇒ <code>void</code>
    * [~webhook(nodeConf, data)](#module_WebSocket..webhook) ⇒ <code>void</code>
    * [~code2Event(code)](#module_WebSocket..code2Event) ⇒ <code>Object</code>
    * [~allowedTime(params)](#module_WebSocket..allowedTime) ⇒ <code>boolean</code>

<a name="module_WebSocket..onMessage"></a>

### WebSocket~onMessage(message) ⇒ <code>boolean</code>
Обработчик сообщения
Если пришло сообщение и `obj.action == "init"`,
Выполняется отправка сообщения о старте

**Kind**: inner method of [<code>WebSocket</code>](#module_WebSocket)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | сообщение |

<a name="module_WebSocket..onConnection"></a>

### WebSocket~onConnection(ws, req) ⇒ <code>object</code>
Обработчик установки соединения

**Kind**: inner method of [<code>WebSocket</code>](#module_WebSocket)  
**Returns**: <code>object</code> - WebSocket server  

| Param | Type | Description |
| --- | --- | --- |
| ws | <code>object</code> | WebSocket соединение |
| req | <code>object</code> | Запрос |

<a name="module_WebSocket..autoUpdate"></a>

### WebSocket~autoUpdate(buffer, _log, name) ⇒ <code>void</code>
Автодобавление нераспознанных лиц

**Kind**: inner method of [<code>WebSocket</code>](#module_WebSocket)  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>string</code> | путь |
| _log | <code>object</code> | - |
| name | <code>string</code> | имя персоны |

<a name="module_WebSocket..webhook"></a>

### WebSocket~webhook(nodeConf, data) ⇒ <code>void</code>
Отправление запроса

**Kind**: inner method of [<code>WebSocket</code>](#module_WebSocket)  

| Param | Type | Description |
| --- | --- | --- |
| nodeConf | <code>object</code> | параметры пути |
| data | <code>object</code> | данные запроса |

<a name="module_WebSocket..code2Event"></a>

### WebSocket~code2Event(code) ⇒ <code>Object</code>
**Kind**: inner method of [<code>WebSocket</code>](#module_WebSocket)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | код события |

<a name="module_WebSocket..allowedTime"></a>

### WebSocket~allowedTime(params) ⇒ <code>boolean</code>
Проверка: входит ли текущее время во время получения доступа к замку устройства

**Kind**: inner method of [<code>WebSocket</code>](#module_WebSocket)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>string</code> | параметры события |

