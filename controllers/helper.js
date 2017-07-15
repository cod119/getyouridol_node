var output = {};

Array.range = function(a, b, step){
    var A= [];
    if(typeof a== 'number'){
        A[0]= a;
        step= step || 1;
        while(a+step<= b){
            A[A.length]= a+= step;
        }
    }
    else{
        var s= 'abcdefghijklmnopqrstuvwxyz';
        if(a=== a.toUpperCase()){
            b=b.toUpperCase();
            s= s.toUpperCase();
        }
        s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
        A= s.split('');        
    }
    return A;
}

function extractValsByKey(arr, key) {
    var result = [];
    
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i][key];
        if ((typeof(val) === "string" && val !== "-")|| val >= 0) {
           result.push(val); 
        }
    }
    
    return result;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


output.uniq = function uniq(data) {
    return data.filter(onlyUnique);    
}

output.filterByKey = function filterByKey(data, key, val) {
    var result = []
    for (var i = 0; i < data.length; i++) {
        if (data[i][key] === val) {
            result.push(data[i]);
        }
    }
    return result;
}

output.rangeArray = function rangeArray(data, key, unit, isminmax) {
    isminmax = isminmax || 0;
    //isminmax가 0이면 min, 1이면 max
    //key는 string오로 입력하면 symbol로 변환함.
    //신장
    var rangeArrayRaw = extractValsByKey(data, key);
    // if (key === "weight") {
    //         console.log("rangeArray", rangeArrayRaw)

    // }
    var minRaw = Math.floor(Math.min.apply(null, rangeArrayRaw) / unit);
    var maxRaw = Math.floor(Math.max.apply(null, rangeArrayRaw) / unit);
    
    var result = Array.range((minRaw + isminmax) * unit, (maxRaw + isminmax) * unit, unit);
    return result.filter(onlyUnique);
}

output.nonRangeArray = function nonRangeArray(data, key, includeZero) {
    //includeZero가 1이면 0을 Hash에 포함하여 출력, 0이면 미포함.
    //key는 string오로 입력하면 symbol로 변환함.
    var nonRangeArrayRaw = extractValsByKey(data, key);
    if (includeZero == 0) {
        nonRangeArrayRaw = nonRangeArrayRaw.filter(function(v) {
            return v !== 0 && v !== "0";
        })
    }

    return nonRangeArrayRaw.filter(onlyUnique);
}

output.multipleValArray = function multipleValArray(beforeSelect, key, separator, includeZero) {
    //특정 'key' column의 값이 특정 'separator' (예: ',')로 구분되어 있는 경우
    //이를 단위로 분리하여, 중복되지 않는 모든 값으로 이루어진 array를 출력
    //beforeSelect는 select 구문 전에 들어갈 raw db
    //includeZero가 1이면 0을 Hash에 포함하여 출력, 0이면 미포함.
    //key는 string오로 입력하면 symbol로 변환함.
    var multipleValArrayRaw = extractValsByKey(beforeSelect, key);
    //@multipleValArrayRaw = beforeSelect.select(key.to_sym).order().distinct.pluck(key.to_sym).flatten
    var newMultipleValArray = []
    for (var i = 0; i < multipleValArrayRaw.length; i++){
        var val = multipleValArrayRaw[i];
        if (val.toString().includes(separator)) {
            var splittedArray = val.split(separator);
            newMultipleValArray.concat(splittedArray);
            continue;
        }
        newMultipleValArray.push(val);
    }
    
    if (includeZero == 0) {
        newMultipleValArray = newMultipleValArray.filter(function(v) {
            return v !== 0 && v !== "0";
        })
    }
  
    return newMultipleValArray.filter(onlyUnique);
}

module.exports = output;