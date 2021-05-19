FROM node:latest

# set working directory
RUN mkdir -p ../process-app
WORKDIR /process-app

# install and cache app dependencies
COPY /process-app/package*.json ./

RUN npm install

COPY . /process-app

CMD ["npm", "run", "start"]