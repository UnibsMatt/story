# ---------- Build stage ----------
FROM node:22-alpine3.22 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the React app
RUN npm run build

# ---------- Production stage ----------
FROM nginx:alpine3.22-slim

# Copy React build output to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional, if you need routing for React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
