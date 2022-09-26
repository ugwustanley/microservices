FROM node:16

WORKDIR /app

COPY package*.json .
COPY .babelrc .


RUN npm install

COPY . .

#ENV PORT=7000
EXPOSE 7000

CMD ["npm","start"]
