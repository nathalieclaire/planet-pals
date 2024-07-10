# syntax=docker/dockerfile:1
FROM node:22.4.0-slim
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "build"]
