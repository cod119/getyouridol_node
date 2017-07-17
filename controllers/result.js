var helper = require(__dirname + "/helper.js");
var data = global.db;

var output = {};

output.idols = function(params) {
    params = params || {};
    var result = data;
    
    //이름 검색창으로부터 검색했는지 여부를 판단
    if (params.name) {
        var name = params.name.toString().toLowerCase();
        result = result.filter(function(v) {
            return v["nameko"].toString().includes(name) || v["nameja"].toString().includes(name) || v["nameen"].toString().toLowerCase().includes(name) || v["cv"].toString().includes(name); 
        })
    } else {
        
        //성별
        if (params.gender.toString() !== "") {
            result = result.filter(function(v) {
                return v["gender"] === params.gender;
            });
        }
        
        //연령
        if (params.age && params.ageUnkown) {
            var ageMMarray = params.age.split("-");
            var ageUnknown = parseInt(params.ageUnknown);
        }
        if (ageUnknown !== 1) {
            result = result.filter(function(v) {
                return v["age"] >= 0;
            })
        }
        if (params.age && params.age !== "" && params.age !== "5-41") {
            result = result.filter(function(v) {
                return v["age"] >= ageMMarray[0] && v["age"] <= ageMMarray[1] || v["age"] < 0;
            })
        } else if (params.age === "5-41") {
            result = result.filter(function(v) {
                return v["age"] <= ageMMarray[0] || v["age"] >= ageMMarray[1];
            })
        }
        
        //신장
        var heightUnknown = parseInt(params.heightUnknown);
        if (heightUnknown !== 1) {
            result = result.filter(function(v) {
                return v["height"] >= 0;
            })
        }
        result = result.filter(function(v) {
            return v["height"] >= params.heightMin && v["height"] < params.heightMax || v["height"] < 0;
        })
        
        //체중
        var weightUnknown = parseInt(params.weightUnknown);
        if (weightUnknown !== 1) {
            result.filter(function(v) {
                return v["weight"] >= 0;
            })
        }
        result = result.filter(function(v) {
            return v["weight"] >= params.weightMin && v["weight"] < params.weightMax || v["weight"] < 0;
        })
        
        //b
        var bwhUnknown = parseInt(params.bwhUnknown);
        if (bwhUnknown !== 1) {
            result.filter(function(v) {
                return v["b"] >= 0 && v["w"] >= 0 && v["h"] >= 0;
            });
        }
        result = result.filter(function(v) {
            return v["b"] >= params.bMin && v["b"] < params.bMax || v["b"] < 0;
        });
        
        //w
        result = result.filter(function(v) {
            return v["w"] >= params.wMin && v["w"] < params.wMax || v["w"] < 0;
        });
        
        //h
        result = result.filter(function(v) {
            return v["h"] >= params.hMin && v["h"] < params.hMax || v["h"] < 0;
        });
        
        //소속사
        if (params.productionorunit !== "") {
            result = result.filter(function(v) {
                return v["productionorunit"].toString().includes(params.productionorunit.toString());
            });
        }
        
        //헤어스타일
        if (params.hairstyle.toString() !== "") {
            result = result.filter(function(v) {
                return v["hairstyle"].toString().includes(params.hairstyle.toString());
            });
        }
        if (params.hairstyle2.toString() !== "") {
            result = result.filter(function(v) {
                return v["hairstyle2"].toString() === params.hairstyle2.toString();
            });
        }
        if (params.hairstyle3.toString() !== "") {
            result = result.filter(function(v) {
                return v["hairstyle3"].toString() === params.hairstyle3.toString();
            });
        }
        
        //기타특징
        if (params.feature.toString() !== "") {
            result = result.filter(function(v) {
                return v["feature"].toString().includes(params.feature.toString());
            });
        }
        if (params.feature2.toString() !== "") {
            result = result.filter(function(v) {
                return v["feature"].toString() === params.feature2.toString();
            });
        }
        if (params.feature3.toString() !== "") {
            result = result.filter(function(v) {
                return v["feature"].toString() === params.feature3.toString();
            });
        }
        
        //소속사2
        if (params.productionorunit_multisel) {
            result = result.filter(function(v) {
                var temp = false;
                for (var i = 0; i < params.productionorunit_multisel.length; i++) {
                    if(v["productionorunit"].toString() === params.productionorunit_multisel[i].toString()) {
                        temp = true;
                    }
                }
                return temp;
            });
        }
    }
    // console.log("result is", result)
    return result;
};

module.exports = output;
