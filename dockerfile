FROM node:22.11.0
WORKDIR /backend_iii
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]