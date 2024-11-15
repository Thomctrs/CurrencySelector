init:
	pip install -r requirements.txt

launch-database:
	docker compose up -d

wait-for-database:
	until docker compose exec db pg_isready -U postgres; do \
		echo "En attente de la base de données..."; \
		sleep 2; \
	done

launch-server:
	python3 manage.py runserver

start: launch-database 

stop:
	docker compose down
