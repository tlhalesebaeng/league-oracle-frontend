FROM node:alpine3.18 as build

# Declare build time environment variables
ARG VITE_BACKEND_BASE_URL
ARG ENVIRONMENT

# Set default values for environment variables
ENV VITE_BACKEND_BASE_URL=$BACKEND_BASE_URL
ENV VITE_ENVIRONMENT=$ENVIRONMENT

# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]