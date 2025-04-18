# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy application source
COPY . .

# Expose API port
EXPOSE 4000

# Start command
CMD ["node", "server.js"]