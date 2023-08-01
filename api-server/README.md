# Run with pm2 (first priority)
# Install pm2 first (npm i -g pm2)
# to start the Node.js server using PM2 by running the following command
pm2 start index.js


# Run in local
npm start


# Documentation:: https://futurestud.io/tutorials/pm2-create-multiple-environments-in-process-file-json-js-yaml
# Migration DB and tables
# Note: config\config.json for sequelize init
# Documentation:: https://sequelize.org/docs/v6/other-topics/migrations/#installing-the-cli
npx sequelize-cli migration:generate --name create_users_table
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all