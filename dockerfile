FROM node:18.3-buster-slim

WORKDIR /app

COPY package*.json ./
COPY react ./react
# REQUIRED ENV: SESSION_SECRET,  MONGODB_CONNSTRING,  NODE_ENV,  ENV PORT

RUN cd react && npm ci && npm run build && cd .. && rm -r ./react

RUN npm ci --production

COPY . .


#ENV HTTPSPORT=8081

EXPOSE 8080
#EXPOSE 8081

CMD ["npm", "start"]