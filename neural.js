// convert data
var trainingData = tf.tensor2d(training.map( item => [
    item.item_size, item.item_weight
]));
const outputData = tf.tensor2d(training.map(item => [
    item.item_place === "S01" ? 1 : 0,
    item.item_place === "S02" ? 1 : 0,
    item.item_place === "S03" ? 1 : 0,
    item.item_place === "S04" ? 1 : 0,
    item.item_place === "S05" ? 1 : 0,
    item.item_place === "S11" ? 1 : 0,
    item.item_place === "S12" ? 1 : 0,
    item.item_place === "S13" ? 1 : 0,
    item.item_place === "S14" ? 1 : 0,
    item.item_place === "S15" ? 1 : 0,    
    item.item_place === "S21" ? 1 : 0,
    item.item_place === "S22" ? 1 : 0,
    item.item_place === "S23" ? 1 : 0,
    item.item_place === "S24" ? 1 : 0,
    item.item_place === "S25" ? 1 : 0,    
    item.item_place === "S31" ? 1 : 0,
    item.item_place === "S32" ? 1 : 0,
    item.item_place === "S33" ? 1 : 0,
    item.item_place === "S34" ? 1 : 0,
    item.item_place === "S35" ? 1 : 0,    
    item.item_place === "S41" ? 1 : 0,
    item.item_place === "S42" ? 1 : 0,
    item.item_place === "S43" ? 1 : 0,
    item.item_place === "S44" ? 1 : 0,
    item.item_place === "S45" ? 1 : 0,
    item.item_place === "S51" ? 1 : 0,
    item.item_place === "S52" ? 1 : 0,
    item.item_place === "S53" ? 1 : 0,
    item.item_place === "S54" ? 1 : 0,
    item.item_place === "S55" ? 1 : 0,
]));
var testingData = tf.tensor2d(testing.map( item => [
    item.item_size, item.item_weight
]));
// build neural
var model = tf.sequential();
model.add(tf.layers.dense({
    inputShape: [2],
    activation: "sigmoid",
    units: 6,
}));
model.add(tf.layers.dense({
    inputShape: [6],
    activation: "sigmoid",
    units: 30,
}));
model.add(tf.layers.dense({
    activation: "sigmoid",
    units: 30,
}));
model.compile({
    loss:"meanSquaredError",
    optimizer: tf.train.adam(.06),
});
// train network
var startTime = Date.now();
model.fit(trainingData, outputData, {epochs:200})
.then((history)=>{
    //console.log(history);
   var x = model.predict(testingData);
   var readable_output = x.dataSync();
   console.log(readable_output);
})
// test