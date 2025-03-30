FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY ./nebula-ui/storybook-static/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
