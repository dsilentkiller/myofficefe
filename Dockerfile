# Use Node.js 20.15 as the base image
FROM node:20.15

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to optimize caching)
COPY package.json package-lock.json ./

# Fix permission issues
RUN chmod -R 777 /app

# Install dependencies (retry logic for network issues)
RUN npm install --legacy-peer-deps || npm install --force || npm install

# Copy all project files into the container
COPY . .

# Build the React app
RUN npm run build
# Install serve to run the app
RUN npm install -g serve




# Expose port 3000
EXPOSE 3000
#install `serve` to serve the production build
# Start the React app
# CMD ["npm", "start"]
# Use serve to run the build output
CMD ["npx", "serve", "-s", "build", "-l", "3000" ,"npm", "start","npx serve -s build"] 






# FROM node:20python.15.1

# WORKDIR /myofficefe  

# COPY package*.json ./

# RUN npm install

# COPY . .

# ENV  PORT = 8080

# EXPOSE 8000

# CMD  ["npm", "start"]