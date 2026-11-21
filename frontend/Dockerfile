
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install production and development dependencies, including Vite
RUN npm install --include=dev

COPY . .

EXPOSE 5173

CMD ["node", "node_modules/vite/bin/vite.js", "--host", "0.0.0.0"]
