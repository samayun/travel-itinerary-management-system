build:
	sudo docker-compose -f docker-compose.yaml up --build -d

shell:
	sudo docker-compose -f docker-compose.yaml exec api sh 

logs:
	sudo docker-compose -f docker-compose.yaml logs --follow api

destroy:
	sudo docker-compose down