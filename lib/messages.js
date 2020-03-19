const IIC2513_ASCII_ART = `
    _____ _____ _____ ___  _____ __ ____
   |_   _|_   _/ ____|__ \\| ____/_ |___ \\
     | |   | || |       ) | |__  | | __) |
     | |   | || |      / /|___ \\ | ||__ <
    _| |_ _| || |____ / /_ ___) || |___) |
   |_____|_____\\_____|____|____/ |_|____/
                                             `;


const INITIAL_MESSAGE = `
  ${IIC2513_ASCII_ART}
  Welcome to project template generator!
  Remember, in order to run your project you need:

    * PostgreSQL
    * Node (12.16 or above)
    * Yarn
  `;

const FINAL_MESSAGE = `

  You're almost ready!

    1. Install dependencies (if you skipped that step)
    2. See /src/config/database.js
    3. Configure environment variables to point to your database
    4. Then 'yarn start' (or 'yarn dev')

  Happy coding! :)
`;

module.exports = {
  INITIAL_MESSAGE,
  FINAL_MESSAGE,
};
