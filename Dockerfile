#FROM node:latest
#
#RUN mkdir -p /app/src
#
#WORKDIR /app/src
#
#COPY package.json .
#
#RUN npm install --legacy-peer-deps
#
#COPY . .
#
#EXPOSE 4200
#
#CMD ["npm", "start"]

FROM nginx:alpine
COPY /dist/acmeincapp /usr/share/nginx/html
EXPOSE 80
