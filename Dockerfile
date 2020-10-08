FROM nginx:alpine
ARG DIST=dist/project3-frontend
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
WORKDIR /usr/share/nginx/html
COPY $DIST .
CMD ["nginx", "-g", "daemon off;"]
