@echo off

:: Install global dependencies. Depending on your user account you may need to
:: gain elevated privileges using something like `sudo`.
npm i -gq grunt-cli bower

:: Optionally install coveralls (integration is baked in with Travis CI).
npm i -gq coveralls

:: Install NPM dependencies.
npm i -q

pause