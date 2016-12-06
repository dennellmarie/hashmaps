/* Separate Chaining */

var HashTable = function(initialCapacity) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity || 8;
    this._deleted = 0;
};

HashTable.MAX_LOAD_RATIO = 0.9;
HashTable.SIZE_RATIO = 3;

HashTable.prototype._hashString = function(string) {
    var hash = 5381;
    string = "" + string
    for (var i=0; i<string.length; i++) {
        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;
    }
    return hash >>> 0;
};


// visually show our key and value pair
var ValuePair = function(key, value) {
    this.key = key
    this.value = value

    this.toString = function() {
        return '[' + this.key + ' - ' + [this.value] + ']'
    }
}

// re-writing old set method for separate chaining use
HashTable.prototype.put = function(key, value) {
    key = "" + key
    var index = this._hashString(key) % this._capacity
   

    if (this._slots[index] == undefined) {
        this._slots[index] = []
        value = [value]
        this._slots[index].push({key, value})
        this.length++
    } else {
        for (let slot of this._slots[index]) {
            if (slot.key === key) {
                slot.value.push(value)
            }
        }
       
    }

    
}

// re-writing old get method for separate chaining use
HashTable.prototype.get = function(key) {
    key = "" + keytable.put
    var index = this._hashString(key) % this._capacity
    console.log("getting",key,"at",index)
    if (this._slots[index] !== undefined) {
        for (let slot of this._slots[index]) {
            if (slot.key === key) {
                return slot.value
            }
        }
    }

    return undefined
}

// remove method for separate chaining
HashTable.prototype.remove = function(key) {
    key = "" + key
    var index = this._hashString(key) % this._capacity
    var slot = this._slots[index]
    console.log("removing", slot, "at", index)
    if (slot !== undefined) {
        for (var i = 0; i < slot.length; i++) {
            console.log('here?')
            console.log(slot[i])
            if (slot[i].key === key) {
                slot.splice(i, 1) // or set slot to undefined
                this.length--
                this._deleted++
                return true
            }
           
        }
    }

    return false
};


function createTable() {
    var table = new HashTable()
    table.put(0, 'hi')
    table.put(1, 'bye')
    table.put(2, 'eat')
    table.put(3, 'sleep')
    return table
}

var table = createTable()

























