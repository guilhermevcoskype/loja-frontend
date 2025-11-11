# Etapa 1 — build do Angular
FROM node:20 AS build
WORKDIR /app

# Copia os arquivos necessários
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

# Etapa 2 — servir o app com NGINX
FROM nginx:1.25
COPY --from=build /app/dist/loja-frontend /usr/share/nginx/html

# Copia configuração customizada do NGINX (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
