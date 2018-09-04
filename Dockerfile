FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies
COPY package.json package-lock.json ./
RUN npm install --quiet

ENV PORT=3000
EXPOSE 3000

# Copy app source
COPY . .

RUN npm run build

CMD [ "npm", "run", "server" ]
