install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npm start

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	npm run build