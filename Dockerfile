FROM alpine

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_CACHE_DIR=/home/web/.cache

WORKDIR /usr/src/app

# Puppeteer v13.5.0 works with Chromium 100.
# RUN yarn add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
#RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#    && mkdir -p /logs \
#    && chown -R pptruser:pptruser /logs \
#    && mkdir -p /home/pptruser/Downloads /app \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /app
#
#RUN chown -R pptruser:pptruser /usr/src/app

# Run everything after as non-privileged user.
# USER pptruser

EXPOSE 3500

COPY . .

RUN npm install

CMD ["node", "src/index.js"]