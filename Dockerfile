FROM node:18-alpine3.16

RUN mkdir -p /opt/whishlist
WORKDIR /opt/whishlist

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]