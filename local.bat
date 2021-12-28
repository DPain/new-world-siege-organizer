cd functions
call npm run build
cd ../ui
cmd /c npm run serve

firebase emulators:start