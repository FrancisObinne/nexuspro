ARG		NODE_VERSION=24
ARG		CONTAINER_TYPE=alpine3.20
FROM    node:${NODE_VERSION}-${CONTAINER_TYPE}
ARG	    PORT
ENV	    PORT=$PORT
RUN	    mkdir -p "/opt/appcare/"
WORKDIR	/opt/appcare/
COPY	[".","/opt/appcare"]
RUN		cd "/opt/appcare/" && npm install
EXPOSE	$PORT 443 80
CMD		[ "npm", "run", "dev" ]
