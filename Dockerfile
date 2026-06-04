FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Install dashboard dependencies
COPY dashboard/package*.json ./dashboard/
RUN cd dashboard && npm ci

# Bundle app source
COPY . .

# Build dashboard
RUN cd dashboard && npm run build

# Expose the health check port from src/app.js
EXPOSE 3000

# Start the bot
CMD [ "npm", "start" ]
