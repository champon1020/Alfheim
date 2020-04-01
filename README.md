# alfheim
[![Build Status](https://travis-ci.com/champon1020/alfheim.svg?token=aSPPKuPzB5pbM6AFGxtS&branch=master)](https://travis-ci.com/champon1020/alfheim)

## Description
My blog's front side. (New version)
Developing and Updating.

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

※Before this step, deploy some secret components.

```
kubectl apply -f alfheim-ingress.yml
```