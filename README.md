[![npm version](https://badge.fury.io/js/vue-analytics.svg)](https://badge.fury.io/js/vue-analytics) [![npm](https://img.shields.io/npm/dt/vue-analytics.svg)](https://www.npmjs.com/package/vue-analytics)


# vue-analytics
Vue plugin for Google Analytics.

## Installation

```shell
npm install vue-analytics
```

## Usage

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

// your Google Analytcs tracking ID
const id = 'UA-XXX-X'

Vue.use(VueAnalytics, { id })

```


## Tracking methods

It's only possible to track events and pages.

`trackEvent`, `trackPage` and `trackTime` methods are available in the Vue instance

```js
/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
Vue.$ga.trackPage('/home')

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
Vue.$ga.trackEvent('share', 'click', 'facebook')

/**
 * Time tracking
 * @param  {String} category
 * @param  {String} variable
 * @param  {Number} value
 * @param  {String} [label='']
 */
Vue.$ga.trackTime('JS Dependencies', 'load', 3549)
```

and also in the component scope itself

```js
export default {
  mounted () {
    this.$ga.trackPage('/home')
  },

  methods: {
    onShareButtonClick () {
      this.$ga.trackEvent('share', 'click', 'facebook')
    }
  }
}
```

Here the documentation about [pageview](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages), [events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) and [timings](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings)


## Google Analytics script loaded callback

```js
Vue.use(VueAnalytics, {
  onAnalyticsReady () {
    // here Google Analaytics is ready to track!
  }
})
```

## Auto-tracking

Auto-tracking is enabled by default and it will load the Google Analytics script and start tracking every route change.

To be able to work properly the route object needs to have a `name` and a `path`

```js
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: {
        template: '<div>home page!</div>'
      }
    },
    {
      name: 'about',
      path: '/about',
      component: {
        template: '<div>about page!</div>'
      }
    }
  ]
})

// your Google Analytcs tracking ID
const id = 'UA-XXX-X'

Vue.use(VueAnalytics, { id, router })

```

**If you only need to track your routes, this is everything you need to do!**

#### Disable auto-tracking

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  autoTracking: false
})
```

#### Ignore routes

Auto-tracking tracks every route in you router instance, but if needed, it's possible to pass an array of route names that we don't want to track


```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  router: router
  ignoreRoutes: ['home']
})
```

## Set

Sets a single field and value pair or a group of field/value pairs on a tracker object.

Read more about Googla analytics [set](https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#set) method

```js
Vue.$ga.set(fieldName, fieldValue)

// also possible to pass an object literal
Vue.$ga.set({ fieldName, fieldName })

```

or in your component scope

```js
export default {
	methods: {
		onClick () {
			this.$ga.set(fieldName, fieldValue)
		}
	}
}
```

## User Explorer report

Add the `userId` on first load just passing it in the options object

```js
Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
  userId: 'xxx'
})
```

**it is also possible to set the `userId` in runtime using the `set` method**


## Debug

Implements Google Analaytics debug library.

You can find documentation about `trace` and `sendHitTask` [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)

**Please remember that it is for debug only. The file size of analytics_debug.js is way larger than analytics.js**


```js
Vue.use(VueAnalytics, {
  debug: {
  	enabled: true,
  	trace: false,
  	sendHitTask: true
  }
})
```

## Go manual!

You can disable auto-tracking and the auto-loading of the Google Analytics script just setting `manual` to `true`

```js
Vue.use(VueAnalytics, {
  manual: true
})
```

With this setup, the plugin only exposes the tracking methods and few helpers, so you have to manually load the script tag from Google, add the tracking ID to the Google snippet and start tracking pages manually.

#### Load Google Analytcs script manually

You can obviously load your google script and snippet in the body tag but you can also still use the `loadScript` method which requires the tracking ID.

```js
import VueAnalytics, { loadScript } from 'vue-analytics'

Vue.use(VueAnalytics)

const id = 'UA-XXX-X'

loadScript(id).then((response) => {
  if (response.error) {
    // couldn't load the Google script
    return
  }

  // all fine!
})
```

#### Start auto-tracking manually

It is also possible to manually start auto-tracking, but you need to pass to the router instance as a parameter

```js
import Vue from 'vue'
import VueAnalytics, { loadScript, autoTracking } from 'vue-analytics'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: {
        template: '<div>home page!</div>'
      }
    },
    {
      name: 'about',
      path: '/about',
      component: {
        template: '<div>about page!</div>'
      }
    }
  ]
})

Vue.use(VueAnalytics)

const id = 'UA-XXX-X'

loadScript(id).then((response) => {
  if (response.error) {
    return
  }

  autoTracking(router)
})
```

# Issues and features requests
Please drop an issue, if you find something that doesn't work, or a feature request at https://github.com/MatteoGabriele/vue-analytics/issues

Follow me on twitter [@matteo_gabriele](https://twitter.com/matteo_gabriele)
