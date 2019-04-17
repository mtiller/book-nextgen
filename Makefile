publish_site:
	-rm -rf json
	-rm -rf static/_images
	-rm -rf static/sponsors
	-mkdir json
	cp -r ../text/build/json .
	mv json/_images static/
	cp -r json/_static/sponsors static/
	yarn install
	yarn index
	yarn build
	yarn export
	$(info Uploading to ZEIT Now)
	@yarn upload -t $(NOW_TOKEN)

alias_preview:
	$(info Aliasing result to mbe-preview.modelica.university)
	@yarn alias_preview -t $(NOW_TOKEN)

alias_release:
	$(info Aliasing result to mbe.modelica.university)
	@yarn alias_release -t $(NOW_TOKEN)
