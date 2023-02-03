FROM node:17-alpine
LABEL maintainer="chinh@willbe.vn"
LABEL nodeVersion="16-alpine"
LABEL awscliVersion="2.0.0"
LABEL version="1.0.0"


# RUN apt-get update -y
# RUN apt-get -y install curl
# RUN apt-get -y install unzip


# RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
# RUN apt-get install -y nodejs


# # https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux-mac.html
# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
# RUN unzip awscliv2.zip
# RUN ./aws/install

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
ENTRYPOINT [ "npm", "run", "start:prod"]
