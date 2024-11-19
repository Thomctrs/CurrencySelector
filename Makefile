init:
	pip install -r requirements.txt

start: 
	docker compose up

stop:
	docker compose down
