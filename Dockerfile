FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

RUN mkdir -p LEARN_DOCKER

COPY .  /LEARN_DOCKER

CMD ["node", "/LEARN_DOCKER/index.js"]