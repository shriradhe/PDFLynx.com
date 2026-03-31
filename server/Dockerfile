FROM node:20-slim

# Install LibreOffice for Word <-> PDF conversion and GraphicsMagick for pdf2pic
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice-core \
    libreoffice-writer \
    graphicsmagick \
    ghostscript \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy server source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server.js"]
