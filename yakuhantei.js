const POSITION_TEHAI = 0
const POSITION_PON = 1
const POSITION_TI = 2
const POSITION_KAN = 3

const TYPE_DEF = ["m", "p", "s", "z"]

var hai = function(value) {
	this.number = value.slice(0, 1)
	this.type = TYPE_DEF.indexOf(value.slice(1, 2))
	this.position = POSITION_TEHAI
}
hai.prototype.toString = function() {
	return "" + this.number + ["m", "p", "s", "z"][this.type]
}
hai.parse = function(value) {
	var chararray = value.split("")
	chararray.reverse()
	var retobj = []
	var typemode = -1
	chararray.forEach(function(value) {
		if (TYPE_DEF.indexOf(value) != -1) {
			typemode = TYPE_DEF.indexOf(value)
			return
		}
		retobj.push(new hai("" + value + TYPE_DEF[typemode]))
	})
	retobj.sort(function(a, b) {
		if (a.type == b.type) {
			return a.number - b.number
		} else {
			return a.type - b.type
		}
	})
	return retobj;
}

checkyaku = function(data) {
	if(data.length!=14)
		return -1;
	var toituArray = data.filter(function(value,index,array){
		return array.some(function(value2,index2,array){
			return JSON.stringify(value)==JSON.stringify(value2)&&index<index2
		})
	}).filter(function(value,index,array) {
		return array.findIndex(function(value2){
			return JSON.stringify(value)==JSON.stringify(value2)
		}) === index;
	});
	toituArray.forEach(function(value,index,array){
		if (value.length == 7){//七対子
			console.log("七対子です")
		}else{
			var kotufilter = function(data){
				if(JSON.stringify(data[0])==JSON.stringify(data[1])&&JSON.stringify(data[1])==JSON.stringify(data[2])){
					return true;
				}
				return false;
			}
			var syuntufilter = function(data){
				if(data[0].type==data[1].type&&data[1].type==data[2].type&&data[0].type!=3){
					return data[0].number == data[1].number-1&&data[1].number == data[2].number-1;
				}else{
					return false;
				}
			}
			var copyData = data.concat()
			var toituFlag = false;
			copyData.forEach(function(value2,index2,array2){ //対子を除く
				if(JSON.stringify(value)==JSON.stringify(value2)&&toituFlag==false){
					copyData.splice(index2,2);
					toituFlag = true;
				}
			});
			var mentuArray = [];
			var readIndex = 0
			while(copyData.length!=0){
				if(kotufilter(copyData.slice(readIndex,readIndex+3))){
					readIndex = 0;
					mentuArray[mentuArray.length] = [copyData.slice(readIndex,readIndex+3)]
					copyData.splice(readIndex,3);
					continue;
				}
				if(syuntufilter(copyData.slice(readIndex,readIndex+3))){
					readIndex= 0;
					mentuArray[mentuArray.length] = [copyData.slice(readIndex,readIndex+3)]
					copyData.splice(readIndex,3);
					continue;
				}
				readIndex++;
			}
			console.log(mentuArray)
		}
	});
	return toituArray
}

(function(){
    console.log(document.getElementById("out"))
}()