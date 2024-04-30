FROM node:20-alpine
RUN mkdir /usr/src/app
WORKDIR /usr/src
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /usr/src/node_modules/.bin:$PATH
WORKDIR /usr/src/app
COPY . .
#RUN npm run build-dev
EXPOSE 5000

CMD ["npm", "run", "start:dev"]
RUN npm install


