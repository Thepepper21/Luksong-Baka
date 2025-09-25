FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3000"]
