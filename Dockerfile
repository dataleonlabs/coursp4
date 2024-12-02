FROM sitespeedio/node:ubuntu-22-04-nodejs-20.10.0

# Set application working directory 
WORKDIR /usr/src/app

# Copy files
COPY . .

RUN npm install

# CMD npm start
CMD /bin/bash
