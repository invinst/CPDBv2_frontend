FROM circleci/node:boron-browsers

USER root

# Yarn in the default CircleCI image is old. Let's use our specific version:
ENV YARN_VERSION 1.10.1

RUN set -ex \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
  done \
  && cd ~ \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && rm -rf /opt/yarn \
  && rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg /usr/local/bin/yarn /usr/local/bin/yarnpkg \
  && mkdir -p /opt/yarn \
  && chown circleci:circleci -R /opt/yarn \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/yarn --strip-components=1 \
  && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz


# Update Chrome to latest
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get -yqq update && \
    apt-get -yqq install google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*


# Install azcopy to copy static content to cdn
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
         rsync \
         libunwind8 \
    && rm -rf /var/lib/apt/lists/*

RUN set -ex \
    && curl -L -o azcopy.tar.gz \
    https://aka.ms/downloadazcopylinux64 \
    && tar -xf azcopy.tar.gz && rm -f azcopy.tar.gz \
    && ./install.sh && rm -f install.sh \
    && rm -rf azcopy


# Install miscelaneous tools
RUN apt-get update && apt-get install vim


# Run as non root user
RUN useradd -ms /bin/bash deploy

USER deploy
WORKDIR /home/deploy
