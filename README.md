# Habbo Retro Browser

This is a web browser which allows you to continue playing multiple Habbo retros without the need of downloading multiple clients.

## To Use
```bash
# Clone this repository
git clone https://github.com/habboretro/browser
# Go into the repository
cd browser
# Install dependencies
yarn
# If using npm, use this commmand instead of yarn
npm install
# Make the environment changes
cp .env.example .env
# Run the app
yarn start 
# If using npm, use this commmand instead of yarn start
npm run start
```

## Configuration
```env
# Add as many default tabs to open by comma seperating
BROWSER_DEFAULT_TABS="https://findretros.com,https://pabbo-hotel.com"
```

