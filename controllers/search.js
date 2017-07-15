var helper = require(__dirname + "/helper.js");
var data = global.db;

var output = {};

//신장
output.heightMinRangeArray = helper.rangeArray(data, "height", 5, 0);
output.heightMaxRangeArray = helper.rangeArray(data, "height", 5, 1);
// @heightMinRangeArray = rangeArray('height', 5, 0)
// @heightMaxRangeArray = rangeArray('height', 5, 1)
//체중
output.weightMinRangeArray = helper.rangeArray(data, "weight", 5, 0);
output.weightMaxRangeArray = helper.rangeArray(data, "weight", 5, 1);
// @weightMinRangeArray = rangeArray('weight', 5, 0)
// @weightMaxRangeArray = rangeArray('weight', 5, 1)
//b
output.bMinRangeArray = helper.rangeArray(data, "b", 5, 0);
output.bMaxRangeArray = helper.rangeArray(data, "b", 5, 1);
// @bMinRangeArray = rangeArray('b', 5, 0)
// @bMaxRangeArray = rangeArray('b', 5, 1)
//w
output.wMinRangeArray = helper.rangeArray(data, "w", 5, 0);
output.wMaxRangeArray = helper.rangeArray(data, "w", 5, 1);
// @wMinRangeArray = rangeArray('w', 5, 0)
// @wMaxRangeArray = rangeArray('w', 5, 1)
//h
output.hMinRangeArray = helper.rangeArray(data, "h", 5, 0);
output.hMaxRangeArray = helper.rangeArray(data, "h", 5, 1);
// @hMinRangeArray = rangeArray('h', 5, 0)
// @hMaxRangeArray = rangeArray('h', 5, 1)
//소속사
output.productionorunit = helper.multipleValArray(data, "productionorunit", "//", 0).sort();
// @productionorunit = multipleValArray(Idol, 'productionorunit', '//', 0).sort
//@productionorunit = Idol.select(:productionorunit).distinct.order(productionorunit: :asc)
//hairstyle
output.hairstyle = helper.multipleValArray(data, "hairstyle", "//", 0).sort();
output.hairstyle2 = helper.nonRangeArray(data, "hairstyle2", 0);
output.hairstyle3 = helper.nonRangeArray(data, "hairstyle3", 0);
// @hairstyle = multipleValArray(Idol, 'hairstyle','//', 0).sort
// @hairstyle2 = nonRangeArray('hairstyle2', 0)
// @hairstyle3 = nonRangeArray('hairstyle3', 0)
//feature
output.feature = helper.nonRangeArray(data, "feature", 0);
// @feature = nonRangeArray('feature', 0)
//소속사2
output.mediafromp = helper.nonRangeArray(data, "mediafromp", 0).sort();
output.mediafromp_1 = {};
output.mediafromp.forEach(function(val, index) {
    var total = helper.multipleValArray(helper.filterByKey(data, "mediafromp", val), "productionorunit", "//", 0).sort();
    output.mediafromp_1[val] = total.filter(function(val, index) {
        return val !== "0" && val !== 0;
    })
})

module.exports = output;