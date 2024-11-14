init:
	pip install -r requirements.txt

launch-database:
	docker compose up -d  # -d lance en mode détaché pour continuer

wait-for-database:
	until docker compose exec db pg_isready -U postgres; do \
		echo "En attente de la base de données..."; \
		sleep 2; \
	done

launch-server: wait-for-database
	python3 manage.py runserver

start: launch-database wait-for-database launch-server

stop:
	docker compose down
