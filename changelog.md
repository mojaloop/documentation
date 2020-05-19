# Changelog
<!--
For this to work, add "changelog" in the plugins list on book.json file"
 -->
[![Git Releases](https://img.shields.io/github/release/mojaloop/documentation.svg?style=flat)](https://github.com/mojaloop/documentation/releases)

{% changelog %}
    {% date %}
    {% message %}
    {% files %}
        {% badge %}
        {% filename link=true %}
        {% changes truncate=true %}
    {% endfiles %}
{% endchangelog %}
