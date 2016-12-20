# <%= name %>
> <%= description %>

## Deployment
> Hosted on [Netlify][netlify]

> Builds on push to develop/master

Request access from [@<%= githubUsername %>]

| Env        | Branch                    | Url                                      | Build Status                                     |
| ---        | ---                       | ---                                      | ---                                              |
| Staging    | [origin/develop][develop] | [staging-url.netlify.com][staging]       | [![Build Status Master][travis-develop]][travis] |
| Production | [origin/master][master]   | [production-url.netlify.com][production] | [![Build Status Develop][travis-master]][travis] |

## Setup
- make sure [node.js][node] is at version >= `6`
- `npm i spike -g`
- clone this repo down and `cd` into the folder
- run `npm install`
- run `spike watch` or `spike compile`

## Testing
Tests are located in `test/**` and are powered by [ava]
- `npm install` to ensure devDeps are installed
- `npm test` to run test suite

[netlify]: //netlify.com
[<%= githubUsername %>]: //github.com/<%= githubUsername %>
[develop]: //github.com/<%= orgName %>/<%= name %>
[master]: //github.com/<%= orgName %>/<%= name %>/tree/master
[staging]: //staging-url.netlify.com
[production]: //production-url.netlify.com
[travis]:
[travis-master]:
[travis-develop]:
[node]: //nodejs.org
[ava]: //github.com/sindresorhus/ava
