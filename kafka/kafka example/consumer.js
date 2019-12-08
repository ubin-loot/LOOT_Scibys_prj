
  var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient({kafkaHost:'172.30.1.16:9092'}),
  consumer = new Consumer(client, [{ topic: "cat", partition: 0 }], {
    autoCommit: false
  });

  consumer.on("message", function(message) {
  console.log(message);

  /** { topic: 'cat', value: 'I have 385 cats', offset: 412, partition: 0, highWaterOffset: 413, key: null } */

  });