boosh:
	smoosh make ./build.json
	cp images/* dist/

clean:
	rm -rf dist
# requires npm >= 1.0.0
install:
	npm install smoosh -g
