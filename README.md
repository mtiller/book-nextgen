A book generator that is based on Next.js and Blueprint.js

## Setup

### JSON Files

In order for the generator to work, it requires all the JSON files to be placed
in a directory named `json` in the root of the project (this is already in the
`.gitignore` file).

The simplest way to set this up is to copy the `json` directory from the Sphinx
`build` directory, _e.g.,_

```sh
$ cp -r ../text/build/json .
```

### Images

After that, we need to populate `static/_images`. The simplest thing is to
simply move the `_images` folder in `json` to `static`, _e.g.,_

```sh
$ mv json/_images static
```

### Static Assets

Finally, we need to move everything from `json/_static/sponsors` into
`static/sponors`, _i.e.,_

```sh
$ mv json/_static/sponsors static
```

## Deployment

I'm using ZEIT's `now` package which is quite simple and easy to use. Just run
`yarn upload` to sync and publish the site.
