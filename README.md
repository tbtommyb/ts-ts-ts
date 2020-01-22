# ts-ts-ts in Typescript

A drum machine build using RxJS and TypeScript. See it running [here](https://www.tmjohnson.co.uk/ts-ts-ts/index.html).

## TODO

- [ ] Pause button
- [ ] Restart
- [ ] Tests
- [ ] Have BPM changes picked up mid-measure rather than restarting
- [ ] More robust typing

## Build

```
$ parcel build
```

### Building for deploying on blog

```
$ rm dist
$ rm ~/coding/blog/static/ts-ts-ts/*
$ parcel build index.html --public-url /ts-ts-ts
$ cp dist/* ~/coding/blog/static/ts-ts-ts/
```

And then redeploy blog as normal.
