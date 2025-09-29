build:
	docker build -t story:latest .

run: build
	docker run -p "80:80" -d story:latest