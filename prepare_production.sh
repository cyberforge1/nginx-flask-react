#!/usr/bin/env bash
# prepare_production.sh

# Exit immediately if a command exits with a non-zero status
set -e

# 1. Define paths and directories
PROJECT_ROOT="/Users/softdev/Desktop/github-projects/nginx-flask-react"
OUTPUT_DIR="$PROJECT_ROOT/production_build"
BACKEND_BUILD_DIR="$OUTPUT_DIR/backend"
STATIC_DIR="$BACKEND_BUILD_DIR/app/static"
NGINX_CONFIG_SRC="$PROJECT_ROOT/nginx-flask-react.conf"
NGINX_CONFIG_DEST="$OUTPUT_DIR/nginx-flask-react.conf"
ZIP_FILE="$OUTPUT_DIR/nginx-flask-react.zip"

# 2. Cleanup previous build artifacts
echo "Cleaning up previous builds..."
rm -rf "$OUTPUT_DIR"

# 3. Build the React frontend
echo "Building the React frontend..."
cd "$PROJECT_ROOT/frontend"
npm install --silent
npm run build --silent
cd "$PROJECT_ROOT"

# 4. Create the production output directory structure
echo "Creating production build directory..."
mkdir -p "$STATIC_DIR"  # Flask static directory

# 5. Copy React build to Flask static folder
echo "Copying React build to Flask static folder..."
cp -r "$PROJECT_ROOT/frontend/dist/"* "$STATIC_DIR"

# 6. Copy Flask backend files
echo "Copying Flask backend files..."
mkdir -p "$BACKEND_BUILD_DIR"
cp -r "$PROJECT_ROOT/backend/app" "$BACKEND_BUILD_DIR/"
cp "$PROJECT_ROOT/backend/run.py" "$BACKEND_BUILD_DIR/"
cp "$PROJECT_ROOT/backend/requirements.txt" "$BACKEND_BUILD_DIR/"
cp "$PROJECT_ROOT/backend/.env" "$BACKEND_BUILD_DIR/"
cp -r "$PROJECT_ROOT/backend/migrations" "$BACKEND_BUILD_DIR/"

# 7. Copy NGINX server configuration
echo "Copying NGINX configuration..."
if [ -f "$NGINX_CONFIG_SRC" ]; then
    cp "$NGINX_CONFIG_SRC" "$NGINX_CONFIG_DEST"
else
    echo "Error: NGINX configuration file not found at '$NGINX_CONFIG_SRC'."
    exit 1
fi

# 8. Set up the production backend environment
echo "Setting up the production backend environment..."

# Navigate to the production backend directory
cd "$BACKEND_BUILD_DIR"

# 8.1 Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# 8.2 Activate virtual environment
source venv/bin/activate

# 8.3 Install dependencies
echo "Installing dependencies..."
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet

# 8.4 Run database migrations
echo "Running database migrations..."
flask db upgrade

# Deactivate virtual environment
deactivate
cd "$PROJECT_ROOT"

# 9. Package the production build into a zip file
echo "Creating zip archive for production deployment..."
cd "$OUTPUT_DIR"
zip -r "$ZIP_FILE" ./* > /dev/null
cd "$PROJECT_ROOT"

# 10. Final confirmation
echo "Production build complete!"
echo "Build directory: '$OUTPUT_DIR'"
echo "Zip archive: '$ZIP_FILE'"
