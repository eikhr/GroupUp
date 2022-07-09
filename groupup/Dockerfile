FROM node:16-alpine as builder

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
ENV NODE_ENV production

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

COPY . .
RUN yarn build

FROM nginx:stable-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
