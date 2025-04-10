# Use Node.js 20.15 as the base image
FROM node:20.15

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to optimize caching)
COPY package.json package-lock.json ./

# Fix permission issues
RUN chmod -R 777 /app

# Install dependencies (retry logic for network issues)
RUN npm install --legacy-peer-deps || npm install --force

# Copy all project files into the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]




# FROM node:20python.15.1

# WORKDIR /myofficefe  

# COPY package*.json ./

# RUN npm install

# COPY . .

# ENV  PORT = 8080

# EXPOSE 8000

# CMD  ["npm", "start"]