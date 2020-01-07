# year-view-calendar

React app to render year view of events.

## How to use

Just commit an update to [events.js](events.js).

## Events syntax

```
DD.MM Summary. Description
DD.MM-DD.MM Summary phrase. Description 1. Description 2. Description 3
```

## Get your own instance of calendar

1. Fork https://github.com/tadatuta/year-view-calendar/
2. Auth on https://travis-ci.org via github and switch on `year-view-calendar`.
3. Generate new token on https://github.com/settings/tokens, only `public_repo` permission is needed.
4. Paste generated token on https://travis-ci.org as `GITHUB_TOKEN`. For more instructions please refer to https://docs.travis-ci.com/user/environment-variables#defining-variables-in-repository-settings
5. Edit https://github.com/%%your-login%%/year-view-calendar/blob/calendar/events.js
6. In few minutes an update should be available on https://%%your-login%%.github.io/year-view-calendar
