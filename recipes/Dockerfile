# Use an official Node.js runtime as a parent image
FROM node:current-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY .npmrc ./

# Install dependencies
RUN npm install

RUN npm run prisma:generate

# Bundle app source
COPY . .

# Command to run when the container starts
CMD [ "npm", "start" ]
