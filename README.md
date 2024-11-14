# Application de suivi du cours des devises
Réalisée par :
    - Thomas CATROS
    - Baptiste JULIENNE
    - Noé CHABANON

## Fonctionnement
### Installation
Pour installer les dépendances et bibliothèques requises, vous pouvez exécuter la commande suivante :
    `make init`

Si vous n'avez pas make d'installé, vous pouvez exécuter :
    `pip install -r requirements.txt`


### Lancement de l'application 
Pour lancer l'application, il faut exécuter cette commande :
    `make start`

Si vous n'avez pas make, vous aurez besoin de 2 terminaux pour lancer la base de données et le serveur.
Voici les commandes à exécuter :
    `docker compose up`
    `py manage.py runserver` OU `python manage.py runserver` (selon votre OS)


### Arrêt de l'application
Pour arrêter l'application il suffit d'exécuter :
    `make stop`


## Choix techniques
### Django
Nous avons décidé d'utiliser Django car nous sommes à l'aise avec Python et que c'est un framework qui permet de développer rapidement.
Django est également très intéressant pour son système ORM pour la base de données, qui permet de simplifier les interactions avec cette dernière.

### PostgreSQL
Nous avons choisi Postgres car c'est une base de données relationnelle performante qui respecte les principes ACID. Nous avions déjà travaillé avec par le passé et son utilisation avec docker-compose permet de beaucoup simplifier les choses et de gagner du temps. La base de données a été chargée à partir d'une image Docker.

### Docker Compose
Nous avons utilisé Docker Compose car il permet de gérer des applications multi-conteneurs (comme c'est le cas ici avec la base de données). Cet outil permet également de ne pas avoir à écrire les commandes Docker à la main mais simplement d'exéctuer 'docker compose up'.

### React
React a été choisi car c'est un framework simple d'utilisation qui permet toutefois de concevoir des interfaces dynamiques et performantes.

### Material-UI
C'est une bibliothèque de composants React qui propose un large choix de composants pré-conçus. Cela permet donc de construire rapidement des interfaces élégantes.

### Makefile
L'utilisation d'un Makefile permet de simplifier énormément les commandes à exécuter. Il facilite la gestion de configuration du projet et permet aussi d'automatiser des tâches répétitives.
