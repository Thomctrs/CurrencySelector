launch-database:
	docker compose up

start: launch-database

stop:
	docker compose down