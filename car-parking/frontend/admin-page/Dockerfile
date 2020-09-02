FROM node:current-alpine3.12 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY src ./src/
COPY public ./public/
RUN npm run build

FROM nginx:alpine
#ARG API_GATEWAY_HOST
ARG USE_CONFIG=nginx.conf
COPY --from=build /app/build /usr/share/nginx/html/
COPY ./config/${USE_CONFIG} /etc/nginx/conf.d/default.conf
#Update repository urls to use https instead of default http
#RUN sed -i s'/http:/https:/' /etc/apk/repositories
#RUN sed -i s"/{API_GATEWAY_PATH}/${API_GATEWAY_HOST}/" /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx", "-g","daemon off;" ]