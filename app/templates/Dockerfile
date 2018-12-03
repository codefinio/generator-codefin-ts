FROM node:8-alpine
WORKDIR /app
ADD package.json /app/package.json
RUN yarn install
ADD src /app/src
ADD tsconfig.json /app/tsconfig.json
ADD tslint.json /app/tslint.json
RUN yarn run build
CMD ["node", "build/index.js"]
ENTRYPOINT [ "/bin/sh" ]