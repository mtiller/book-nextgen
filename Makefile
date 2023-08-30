copy_en_files:
	-rm -rf json
	-rm -rf static/_images
	-rm -rf static/sponsors
	-mkdir json
	cp -r ../text/build/json .
	mv json/_images static/
	cp -r json/_static/sponsors static/

copy_kr_files:
	-rm -rf json
	-rm -rf static/_images
	-rm -rf static/sponsors
	-mkdir json
	cp -r ../text/build/json_kr/* json
	mv json/_images static/
	cp -r json/_static/sponsors static/

preview:
	yarn install
	yarn index
	yarn build
	yarn dev

publish:
	yarn install
	yarn index
	yarn build
	yarn export

docker_image: position_files
	docker build . -t mtiller/book-content

publish_site: position_files
	$(info Uploading to ZEIT Now)
	@yarn upload -t $(NOW_TOKEN)

alias_preview:
	$(info Aliasing result to mbe-preview.modelica.university)
	@yarn alias_preview -t $(NOW_TOKEN)
	$(info Aliasing result to beta.book.xogeny.com)
	@yarn alias_beta -t $(NOW_TOKEN)

alias_release:
	$(info Aliasing result to mbe.modelica.university)
	@yarn alias_release -t $(NOW_TOKEN)
	$(info Aliasing result to book.xogeny.com)
	@yarn alias_original -t $(NOW_TOKEN)
