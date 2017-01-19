# generator-s3 [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Yeoman generator to enable S3 deployments via Travis for static websites

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-s3` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-s3
```

You also need to install [Travis CLI](https://github.com/travis-ci/travis.rb#installation)

```bash
gem install travis
```

Then, go to your directory with your static site (we use `my-s3-site` as an example)

```bash
cd my-s3-site
```

Finally, generate your Travis pipeline

```bash
yo s3
```

## Example

Update example

[npm-image]: https://badge.fury.io/js/generator-s3.svg
[npm-url]: https://npmjs.org/package/generator-s3
[travis-image]: https://travis-ci.org/comicrelief/generator-s3.svg?branch=master
[travis-url]: https://travis-ci.org/comicrelief/generator-s3
