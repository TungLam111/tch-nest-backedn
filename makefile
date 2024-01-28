run:
	npx kill-port 3000 && yarn start


.PHONY: generate-module
generate-module:
	@bash bash/generate-module.sh $(MODULE_NAME)

