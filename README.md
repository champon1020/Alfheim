# alfheim

[![Build Status](https://travis-ci.com/champon1020/alfheim.svg?token=aSPPKuPzB5pbM6AFGxtS&branch=master)](https://travis-ci.com/champon1020/alfheim)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Develop Tools

[![](https://img.shields.io/badge/typescript-~3.7.2-blue)](https://github.com/microsoft/TypeScript)
[![](https://img.shields.io/badge/react-^16.12.0-yellow)](https://github.com/facebook/react)
[![](https://img.shields.io/badge/reactrouter-^5.1.2-yellow)](https://github.com/ReactTraining/react-router)
[![](https://img.shields.io/badge/redux-^7.1.3-orange)](https://github.com/reduxjs/redux)
[![](https://img.shields.io/badge/highlight.js-^9.18.1-orange)](https://github.com/highlightjs/highlight.js/)
[![](https://img.shields.io/badge/axios-^0.19.2-red)](https://github.com/axios/axios)
[![](https://img.shields.io/badge/chart.js-^2.9.3-yellow)](https://github.com/chartjs/Chart.js)
[![](https://img.shields.io/badge/openapi-3.0-green)](https://github.com/OAI/OpenAPI-Specification)

## Description
My blog's front side. (New version)

Developing and Updating.

server side => https://github.com/champon1020/argus

## Usage

### Local

- #### yarn

```
sudo yarn start
```

- #### docker

```
docker build . -t alfheim:latest
docker-compose up -d
```

### Deploy

Writter in README of server side repository => https://github.com/champon1020/argus

## Environment Variable

```REACT_APP_TRAVIS```: CI or not

```REACT_APP_ALFHEIM_MODE```: "dev" | "deploy"