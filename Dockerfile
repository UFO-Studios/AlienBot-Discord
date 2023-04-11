FROM node:19-alpine3.16 
COPY . /app 
WORKDIR /app 
RUN npm install 
EXPOSE 3333
CMD ["npm", "run", "docker:start"]
