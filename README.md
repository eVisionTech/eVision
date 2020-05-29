# eVision

## Установка
### Windows
##### Инсталлятор
Скачать инсталлятор из [releases](https://github.com/eVisionTech/eVision/releases) и запустить его.

##### Ручная установка
1. Убедитесь, что у вас установлен Node.js >= 8.10.0.

2. Клонируйте этот проект.
`git clone https://github.com/eVisionTech/eVision.git`

3. Установите зависимости
`npm install`

4. Скачайте [NW.js](https://dl.nwjs.io/v0.39.3/nwjs-v0.39.3-win-x64.zip) (v0.39.3) и скопируйте содержимое архива в корневую папку проекта.

5. Скачайте [MongoDB Community Server](https://www.mongodb.com/download-center/community) (ZIP) и скопируйте содержимое архива в папку db.

6. Запустите nw.exe

### Linux
##### Docker Image
Пример `docker-compose.yml` файла:

	version: '2'
	services:
	  evision:
		build: .
		image: evisioncontrol/evision:latest
		container_name: evision
		network_mode: "host"
		restart: always
		volumes:
		  - '~/evision-data/:/home/evision/evision/data/'
		  - '~/evision-data/media/:/home/evision/evision/media/'
		  - '/etc/localtime:/etc/localtime:ro'
		environment:
		  MONGO_INITDB_DATABASE: evision
		depends_on:
		  - mongodb
	  mongodb:
		image: mongo:4-bionic
		container_name: mongodb
		restart: always
		command: mongod
		ports:
			- 27017:27017
		volumes:
		  - '~/evision-data/data/db/:/data/db'
		environment:
			MONGO_INITDB_DATABASE: evision