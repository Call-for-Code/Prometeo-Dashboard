FROM node:15.1-alpine as build
WORKDIR /app
COPY package.json .

#for node-gyp    
RUN apk add --no-cache python make g++

RUN yarn install
# RUN npm install react-scripts -g --silent
#TODO: optimize COPY here. It copies node_modules over to the image again
COPY . .
RUN yarn run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html