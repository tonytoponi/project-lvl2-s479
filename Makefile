install:
	npm install
start:
	npx babel-node -- 'src/bin/gendiff.js'
publish:
	npm publish --dry-run.
installApp:
	npm link
removeApp:
	npm unlink
lint:
	npx eslint .
test:
	npm run test
watch:
	npm run testWatch