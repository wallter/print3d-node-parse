# [Node Parse](http://parseplatform.org): [Server](https://github.com/parse-community/parse-server) + [Dashboard](https://github.com/parse-community/parse-dashboard)
### Assembled (code to come soon) by Tyler Wall

---

## Dependencies
- mongodb

## QuickStart

```sh
npm install -g parse-server mongodb-runner
mongodb-runner start &
npm start
```

**Dashboard**: http://0.0.0.0:4040 <br>
**Server**: http://localhost:1337/parse

## MongoDB Install Mac OSX via homebrew
```sh
$ brew update
$ brew doctor
$ brew install mongodb
$ sudo mkdir -p /data/db
$ sudo chown -R `id -un` /data/db
$ ls -la /data/db
```

### Install MongoDB with Homebrew
https://gist.github.com/subfuzion/9630872

Set up launchctl to auto start `mongod`

    $ ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents

`/usr/local/opt/mongodb/` is a symlink to `/usr/local/Cellar/mongodb/x.y.z` (e.g., `2.4.9`)

You can use launchctl to start and stop `mongod`

    $ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
    $ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist

You can also more conveniently use `brew` to start, stop, and verify service status

    $ brew services list | grep mongodb
    $ brew services start mongodb
    $ brew services stop mongodb

#### Notes

The default plist provided bymarkthe `dbpath` to be `/usr/local/var/mongodb` instead of the default `/data/db`.

For more about `launchctl` see:

https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/launchctl.1.html#//apple_ref/doc/man/1/launchctl

http://launchd.info/


### Start MongoDB daemon
```sh
$ mongod
# or
$ brew services start mongodb
```
### Enter Mongo CLI
```sh
$ mongo
```

### Install

```sh
$ npm install -g parse-server mongodb-runner
```

### Start mongo-runner
```sh
$ npm run mongodb-runner
$ npm start
```
