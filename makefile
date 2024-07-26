run:
	npx kill-port 3000 && yarn start

.PHONY: generate-module
generate-module:
	@bash bash/generate-module.sh $(MODULE_NAME)

.PHONY: migrate
migrate-add:
	if [ -d "dist" ]; then \
		rm -rf "dist"; \
		echo "Directory dist removed."; \
	fi 
	yarn run add:migration $(MIGRATE_NAME)
	@bash bash/copy-migration-file.sh $(MIGRATE_NAME)

migrate-apply:
	yarn run apply:migration

# CreateUsersTable