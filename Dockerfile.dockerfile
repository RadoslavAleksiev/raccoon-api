FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install production dependencies (use npm ci for exact versions)
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose API port
EXPOSE 4000

# Start command (matches src/server.js location)
CMD ["node", "src/server.js"]