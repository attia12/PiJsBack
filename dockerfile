ENV NODE_VERSION=20.12.7
FROM node:20.12.7
RUN mkdir ~/app
WORKDIR ~
COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH ~/node_modules/.bin:$PATH
WORKDIR ~/app
COPY . .
RUN npm run build-dev
EXPOSE 5000
CMD ["npm", "run", "start:dev"]



