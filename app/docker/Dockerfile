FROM node:latest

# set working directory
RUN mkdir -p ../app
WORKDIR /app

# install and cache app dependencies
COPY /app/package*.json ./

RUN npm install

COPY . /app

CMD ["npm", "run", "start"]