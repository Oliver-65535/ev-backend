EV Backend - система управления зарядными станциями для электромобилей с биллингом

### Принцип работы

EV Backend - использует
Фильтрация данных осуществляется с помощью запросов GraphQL.

### Стэк

В проекти использованы: Nest.js, TypeORM, PostgreSQL, Redis, WebSocket, Nest.js Microservices, GraphQL, Docker, Docker-compose

## Getting started

Для запуска приложения потребуется наличие установленной **Docker**
Скачайте репозиторий:

    git clone ...

Перейдите в папку репозитория:

    cd ev-backend

Скопируйте и переимнуйте файл конфигурации

    cp .env.example .env

Откройте файл .env и обязательно внесите свои данные в следующие строки:

    sudo nano .env

Файл .env

    ...
    DATABASE_PASSWORD="YOUR DATABASE PASSWORD"
    ...
    ...

Остальное можно поправить относительно, относительно вашей конфигурации сети и домена.

Запустите приложение командой:

    sudo docker-compose up -d

### Запуск локально для разработки

Поправьте .env для локальной работы.
Запустите только только Redis и PostgreSQL контейнеры docker командой:

    sudo docker-compose -f docker-compose.db.yml up -d

Вы можете использовать установленные, либо установить Redis и PostgreSQL локально. если у вас не установлен Docker  
Далее можете запускать сервисы приложения отдельно переходя в соответсвующие папки:

Для API:

    cd apps/api-service
    # скопировать и переименовать .env
     cp .env.example .env

    # внести изменения в конфигурацию
     sudo nano .env

    # установить пакеты
    sudo yarn

    # запустить сервис
    sudo yarn start

    # or for wath
    sudo yarn start:dev

Для OCPP-CS:

    cd apps/ocpp-service
    # скопировать и переименовать .env
     cp .env.example .env

    # внести изменения в конфигурацию
     sudo nano .env

    # установить пакеты
    sudo yarn

    # запустить сервис
    sudo yarn start

    # or for wath
    sudo yarn start:dev

# Шаблоны запросов GraphQL

1Получить массив геоточек с данными о количестве свободных коннекторов, с применением фильтра

    QUERY:
    query getFilteredMarkers($input:InputFilterMarkersDto!){
        getFilteredMarkers(input:$input){
    	    siteid
    	    location
    	    available
    	    total
    	  }
        }


    VARIABLES:


           {
      "input": {
        "connectorTypesSelected":["Type 1","Type 2","Tesla","CCS1","CCS2"],
        "connectorStatusSelected":["Available"],
        "minPrice": 0,
        "maxPrice": 70,
        "minPower": 0,
        "maxPower": 60
      }
    }

1.2Подписаться на изменения состояний маркеров в реальном времени

    subscription{
      markerUpdated(input:{
      	connectorTypesSelected:["Type 1","Type 2","Tesla","CCS1","CCS2","CHAdeMO"],
        minPrice: 0,
        maxPrice: 70,
        minPower: 0,
        maxPower: 60,
      }){
       location
        available
        total
      }
    }

2Получить данные о свободных коннекторах геоточки(site) по id(siteId) по типам с применением фильтра

    QUERY:
     query getFilteredSite($input:InputFilterSiteDto!){
      getFilteredSite(input:$input){
        connector_type
        available
        total
      }
    }

    VARIABLES:
    {
      "input": {
        "connectorTypesSelected":["Type 1","Type 2","Tesla","CCS1","CCS2"],
        "minPrice": 0,
        "maxPrice": 70,
        "minPower": 0,
        "maxPower": 60,
        "siteId": 2
      }
    }

2.1Подписаться на изменения site по siteId состояний коннекторов в реальном времени

    subscription{
      siteUpdated(input: {
        connectorTypesSelected:["Type 1","Type 2","Tesla","CCS1","CCS2","CHAdeMO"],
        minPrice: 0,
        maxPrice: 70,
        minPower: 7,
        maxPower: 60,
        siteId: 2
      }){
        connector_type
        available
        total
      }
    }

### Схема базы данных

![enter image description here](./readme-imgs/schema_db.png)
