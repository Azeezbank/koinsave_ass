FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client *inside the Docker container*
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]