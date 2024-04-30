FROM node:20-alpine
RUN mkdir -p ~/app
WORKDIR ~
COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH ~/app/.bin:$PATH
WORKDIR ~/app
COPY . .
#RUN npm run build-dev
EXPOSE 5000
CMD ["npm", "run", "start:dev"]



