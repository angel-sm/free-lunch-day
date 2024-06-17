# Use the official Node.js v20.10.0 image as the base image
FROM node:20.10.0

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

COPY .npmrc ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

RUN npm run prisma:generate

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
