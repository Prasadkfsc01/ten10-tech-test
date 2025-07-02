FROM cypress/browsers:node-18.12.0-chrome-114.0.5735.133-1

# Set working directory
WORKDIR /app

# Copy package files first (for caching dependencies)
COPY package.json package-lock.json* ./

# Install dependencies (includes Cypress)
RUN npm install

# Copy all project files
COPY . .

# Give Cypress executable permissions
RUN npx cypress verify

# Default command
CMD ["npx", "cypress", "run"]
