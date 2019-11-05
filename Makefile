PROJECT=swerve-ui
PARENT=red

REGISTRY=spring-docker.jfrog.io
IMAGE_NAME=$(REGISTRY)/$(PARENT)/$(PROJECT)
IMAGE_LATEST=$(IMAGE_NAME):latest
GIT_HASH=$(shell git rev-parse --short HEAD)
FULL_NAME=$(IMAGE_NAME):$(GIT_HASH)

# test if the make is running inside a Jenkins, then set different network options than on Docker for Mac
ifdef BUILD_NUMBER
    HOSTNAME=$(shell hostname)
    NETWORK=$(shell docker ps -q --filter 'label=io.kubernetes.pod.name=$(HOSTNAME)' -n1)
    DOCKER_OPT_ARGS=--pull --network=container:$(NETWORK)
else
	DOCKER_OPT_ARGS=--pull
endif

.DEFAULT_GOAL: build

.PHONY: build
build:
	docker build $(DOCKER_OPT_ARGS) -t $(FULL_NAME) --build-arg NODE_ENV=$(NODE_ENV) .
	docker tag $(FULL_NAME) $(IMAGE_LATEST)

.PHONY: release
release: build
	docker push $(IMAGE_LATEST)
	docker push $(FULL_NAME)

.PHONY: gettag
gettag:
	@echo $(GIT_HASH)

.PHONY: run
run: build
	docker run $(IMAGE_LATEST)