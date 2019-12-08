var kafka = require("kafka-node");
Producer = kafka.Producer,
client = new kafka.KafkaClient({kafkaHost:'172.30.1.16:9092'}),
producer = new Producer(client);

let count = 0;

producer.on("ready", function() {
  console.log("ready");
  setInterval(function() {
    payloads = [
      { topic: "cat", messages: `I have ${count} cats`, partition: 0 }
    ];

    producer.send(payloads, function(err, data) {
      console.log(data);
      count += 1;
    });
  }, 5000);
});

producer.on("error", function(err) {
  console.log(err);
});
