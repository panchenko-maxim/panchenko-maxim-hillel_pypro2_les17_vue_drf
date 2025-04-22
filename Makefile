DOCKER_COMPOSE = docker-compose
PYTHON = python

.PHONY: test test-coverage

test:
	$(DOCKER_COMPOSE) run backend $(PYTHON) -m pytest

test-coverage:
	$(DOCKER_COMPOSE) run backend coverage run -m pytest
	$(DOCKER_COMPOSE) run backend coverage report
	$(DOCKER_COMPOSE) run backend coverage html
