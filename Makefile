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
	@(cd nextgen; yarn upload --silent -- -t $(NOW_TOKEN))
