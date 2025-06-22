# Grab the image
FROM node:18-alpine

# Specify the working directory
WORKDIR /app

# Copy the dependencies to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci --omit=dev

# Copy the source code to the working directory
COPY . .

# Make the port 3000 available
EXPOSE 3000

# Start the backend service
CMD ["npm", "run", "dev"]