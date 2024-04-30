FROM node:20-alpine
RUN mkdir ~/app
WORKDIR ~
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH ~/node_modules/.bin:$PATH
WORKDIR ~/app
COPY . .
#RUN npm run build-dev
EXPOSE 5000

CMD ["npm", "run", "start:dev"]
RUN npm install


