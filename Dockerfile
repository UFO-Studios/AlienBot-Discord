FROM node:current-alpine3.16
COPY . /app 
WORKDIR /app 
RUN apk add --update nodejs npm python3 py3-pip make
RUN yarn install
EXPOSE 3333
CMD ["npm", "run", "docker:start"]