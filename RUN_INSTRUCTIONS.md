# How to run the Project
**Note:** I've configured this project to use pnpm as the package manager. I haven't changed any of the default pnpm scripts, so you can probably use npm. Probably a good idea though to install pnpm though.
1. run `pnpm install` in the root directory
2. run `pnpm dev` in the root directory to start the development server
3. run `pnpm dev:server` in the root directory to start the backend server using nodemon. This will automatically restart the server if it detects a file change. (Note: if using npm, you may need to start the server using `nodemon src/server/server.ts`)

