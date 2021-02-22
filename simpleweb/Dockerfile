#Selecting Base Image
FROM node:alpine

#SPECIFY WORK DIR

WORKDIR /home/application/

#COPY FILES

COPY ./ ./

#Install Dependencies

RUN npm install

#Startup Script

CMD [ "npm","start" ]

