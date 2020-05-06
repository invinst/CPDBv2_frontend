FROM circleci/node:10-browsers-legacy

USER root

# Update Chrome to latest
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get -yqq update && \
    apt-get -yqq install google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Install miscelaneous tools
RUN apt-get update && apt-get install vim

# Run as non root user
RUN useradd -m deploy && echo "deploy:deploy" | chpasswd && adduser deploy sudo

USER circleci
WORKDIR /home/circleci
