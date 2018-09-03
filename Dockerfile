FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies
COPY package.json package-lock.json ./
RUN npm install --quiet

ENV PORT=8080
EXPOSE 8080

# Copy app source
COPY . .

RUN npm run build

CMD [ "npm", "run", "server" ]
