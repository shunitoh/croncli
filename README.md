croncli
================
cron register script

### Getting Started
``` install
$ npm install -g croncli
```

### Usage
```
$ croncli -s "* * * * * *" -c "ls hoge/" -t "Asia/Tokyo"
Input schedule : "* * * * * *"
Input command  : "ls hoge/"
2016/10/03 18:02:28 $ ls hoge/
hoge.txt

2016/10/03 18:02:29 $ ls hoge/
hoge.txt

2016/10/03 18:02:30 $ ls hoge/
hoge.txt

...
```

### Parameter Description
| options  | required | short option | long option | description               | example                                           |
| ---------|----------|--------------|-------------|---------------------------|---------------------------------------------------|
| schedule | true     | -s           | --schedule  | cron schedule             | $ croncli -s "* * * * * *" -c "node /tmp/hoge.js" |
| command  | true     | -c           | --command   | cron execute command      | $ croncli -s "* * * * * *" -c "node /tmp/hoge.js" |
| time zone| false    | -t           | --timeZone  | cron time zone            | $ croncli -s "* * * * * *" -c "node /tmp/hoge.js" -t "Asia/Tokyo" |
| help     | false    |              | --help      | command usage description | $ croncli --help                                  |

### Reference
- https://github.com/ncb000gt/node-cron
