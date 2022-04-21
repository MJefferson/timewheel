FROM node:14-alpine
ENV NODE_ENV=development PORT=3000
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY --chown=node:node . .
EXPOSE ${PORT}
USER node
CMD ["npm", "start"]
