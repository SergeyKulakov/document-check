# Using storybook

Currently storybook for react native is only supporting node versions no older than 16.xx. 

Relevant testing via storybook of components needs to happen on a mobile device or simulator. 

0. ensure node version 16 is running, via `node -v` command. to change node version on the fly, [nvm](https://github.com/nvm-sh/nvm) is a great tool. latest lts/gallium (v16.17.1) is recommended.
1. set `LOAD_STORYBOOK = 'true'` in `.env` file
2. run `yarn start`. alternatively, run `yarn start-reset-cache` to ensure fresh files are used for first build, since .env file is not always detected as changed.
3. run `yarn storybook`
4. start the app on preferred device or emulator, by running `yarn ios`, `yarn ios-sim` or `yarn android`, as described in app startup section of readme.md. this will compile and start the App in storybook mode, with buttons on bottom of screen to go to navigation (picking the component to view), preview (default view) and addons (from where actions can be submitted, if configured for component or use knobs, manipulating component properties, if any knobs are defined).
5. optional: open `localhost:7007` in browser, which will serve as an alternative navigation interface.


TO DO: document port forwarding needed to run storybook on device