var cconfig = require('cconfig');
var path = require('path');

var config;

if (process.env.METEOR_SETTINGS) {
  config = JSON.parse(process.env.METEOR_SETTINGS);
} else {
  config = cconfig(path.join(process.env.PWD, 'config.json'));
}

var influxdbConfig = config.INFLUXDB ? config.INFLUXDB : config.metrics ? config.metrics.INFLUXDB : undefined;

if ( ! influxdbConfig) throw new Error('metrics-influxdb requires an INFLUXDB or a metrics.INFLUXDB property in config.json');
if ( ! influxdbConfig.HOST) throw new Error('metrics-influxdb requires a HOST property in config.json');
if ( ! influxdbConfig.PORT) throw new Error('metrics-influxdb requires a PORT property in config.json');
if ( ! influxdbConfig.USER) throw new Error('metrics-influxdb requires a USER property in config.json');
if ( ! influxdbConfig.PASS) throw new Error('metrics-influxdb requires a PASS property in config.json');
if ( ! influxdbConfig.DB) throw new Error('metrics-influxdb requires a DB property in config.json');

var InstrumentsClient = require('instruments-client');

var instruments = InstrumentsClient.createClient({
  host: influxdbConfig.HOST,
  port: influxdbConfig.PORT,
  username: influxdbConfig.USER,
  password: influxdbConfig.PASS,
  db: influxdbConfig.DB
});

module.exports = instruments;