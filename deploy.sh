#!/bin/bash
echo "🚀 Deploying API Playground..."
git pull origin main

# Build Backend
cd backend && npm install --production

# Build Frontend
cd ../frontend && npm install && npm run build

# Move compiled assets to web directory
cp -r dist/* /var/www/frontend/

# Restart pm2 process and reload web server proxy
pm2 restart api-playground-backend
sudo nginx -s reload

echo "✅ Deployment complete!"
