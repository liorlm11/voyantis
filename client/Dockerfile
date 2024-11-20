# Use Playwright's official Docker image
FROM mcr.microsoft.com/playwright:v1.38.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port (if needed, adjust for your app)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
