var config = require('cconfig')();

var influxdbConfig = config.INFLUXDB ? config.INFLUXDB : config.metrics ? config.metrics.INFLUXDB : undefined;

if ( ! influxdbConfig) throw new Error('metrics-influxdb requires an INFLUXDB or a metrics.INFLUXDB property in config.json');
if ( ! influxdbConfig.HOST) throw new Error('metrics-influxdb requires a HOST property in config.json');
if ( ! influxdbConfig.PORT) throw new Error('metrics-influxdb requires a PORT property in config.json');
if ( ! influxdbConfig.USER) throw new Error('metrics-influxdb requires a USER property in config.json');
if ( ! influxdbConfig.PASS) throw new Error('metrics-influxdb requires a PASS property in config.json');
if ( ! influxdbConfig.DB) throw new Error('metrics-influxdb requires a DB property in config.json');

var InstrumentsClient = require('instruments-client');

var instruments = InstrumentsClient.createClient({
  host: config.INFLUXDB.HOST,
  port: config.INFLUXDB.PORT,
  username: config.INFLUXDB.USER,
  password: config.INFLUXDB.PASS,
  db: config.INFLUXDB.DB
});

module.exports = instruments;