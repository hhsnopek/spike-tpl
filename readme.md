# Spike Tpl

[![Greenkeeper badge](https://badges.greenkeeper.io/hhsnopek/spike-tpl.svg)](https://greenkeeper.io/)
> Based off of [static-dev/spike-tpl-base], removes sugar and adds flexibility

## TODO
- add netlify setup
- add travis setup

## features
- creates Github repository and disables wiki
- modifies Github repository labels
- uses your `.gitconfig` user.name for contactName
- uses your `.gitconfig` user.email for contactEmail
- uses `npm whoami` for githubUsername

## installation
### dependencies
- [ash-shell/ash]
- [carrot/ash-github]

### using Spike
- `spike tpl add flex git@github.com:hhsnopek/spike-tpl.git`
- `spike new flex <projectName>`

### using Sprout
- `sprout add flex git@github.com:hhsnopek/spike-tpl.git`
- `sprout new flex <projectName>`

## Options
- **name** (name of template):te
- **description** (a short description of the template)
- **contactName** (your name)
- **contactEmail** (your email)
- **githubUsername** (your github username)
- **org** (organization on Github) *Optional
  - **orgName** - (name of Github org)
- **lConfig** - (Github label config, see [carrot/ash-github])

[static-dev/spike-tpl-base]: //github.com/static-dev/spike-tpl-base
[ash-shell/ash]: //github.com/ash-shell/ash
[carrot/ash-github]: //github.com/carrot/ash-github
