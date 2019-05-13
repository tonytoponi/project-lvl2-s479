install:
	npm install
start:
	npx babel-node -- 'src/bin/gendiff.js'
publish:
	npm publish --dry-run.
installApp:
	npm link
lint:
	npx eslint .
test:
	npm run test
watch:
	npm run testWatch