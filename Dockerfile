# Step 1: Build the Angular Frontend
FROM node:16 AS build-angular

# Set working directory for Angular build
WORKDIR /app

# Copy Angular app package.json and install dependencies
COPY ./src/package*.json ./
RUN npm install

# Copy the Angular app source code
COPY ./src ./

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Set up the Express Backend
FROM node:16 AS build-backend

# Set working directory for Express backend
WORKDIR /server

# Copy the backend package.json and install dependencies
COPY ./server/package*.json ./
RUN npm install

# Copy the backend code
COPY ./server ./

# Expose port for the backend (usually port 3000 for Express)
EXPOSE 3000

# Step 3: Set up the Final Image
FROM node:16

# Set working directory for the final image
WORKDIR /app

# Install Nginx to serve the Angular frontend
RUN apt-get update && apt-get install -y nginx

# Copy the Angular build output to the Nginx directory
COPY --from=build-angular /app/dist/ /usr/share/nginx/html

# Copy the backend files from the build-backend stage
COPY --from=build-backend /server /server

# Expose the Nginx port (default 80)
EXPOSE 80

# Start both Nginx and Express server
CMD service nginx start && node /server/server.js
