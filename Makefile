init:
	pip install -r server/requirements.txt

start: 
	docker compose up

stop:
	docker compose down
