croncli
================
cron register script

### Getting Started
``` install
$ npm install -g croncli
```

### Usage
```
$ croncli -s "* * * * * *" -c "ls /tmp/" -t "Asia/Tokyo"
```

### Usage
| options  | required | short option | long option | description               | example                                           |
| ---------|----------|--------------|-------------|---------------------------|---------------------------------------------------|
| schedule | true     | -s           | --schedule  | cron schedule             | $ croncli -s "* * * * * *" -c "node /tmp/hoge.js" |
| command  | true     | -c           | --command   | cron execute command      | $ croncli -s "* * * * * *" -c "node /tmp/hoge.js" |
| time zone| false    | -t           | --timeZone  | cron time zone            | $ croncli -s "* * * * * *" -c "node /tmp/hoge.js" -t "Asia/Tokyo" |
| help     | false    |              | --help      | command usage description | $ croncli --help                                  |

### Reference
- https://github.com/ncb000gt/node-cron
