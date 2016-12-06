var HashMap = function(initialCapacity) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity || 8;
    this._deleted = 0;
};
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

HashMap._hashString = function(string) {
    var hash = 5381;
    for (var i=0; i<string.length; i++) {
        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;
    }
    return hash >>> 0;
};

HashMap.prototype.get = function(key) {
    var index = this._findSlot(key);
    if (this._slots[index] === undefined) {
        // throw new Error('Key error');
        return undefined
    }
    return this._slots[index].value;

    // key : value <-- normal hash table
    // key : [value1, value2, value3] <-- separate chaining
};

HashMap.prototype.set = function(key, value) {
    var loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
        this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    var index = this._findSlot(key);
    this._slots[index] = {
        key: key,
        value: value,
        deleted: false
    };
    this.length++;
};

HashMap.prototype.remove = function(key) {
    var index = this._findSlot(key);
    var slot = this._slots[index];
    if (slot === undefined) {
        throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
};

HashMap.prototype._findSlot = function(key) {
    var hash = HashMap._hashString(key);
    var start = hash % this._capacity;

    for (var i=start; i<start + this._capacity; i++) {
        var index = i % this._capacity;
        var slot = this._slots[index];
        if (slot === undefined || (slot.key == key && !slot.deleted)) {
            return index;
        }
    }
    // Unreachable
};

HashMap.prototype._resize = function(size) {
    var oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];
    for (var i=0; i<oldSlots.length; i++) {
        var slot = oldSlots[i];
        if (slot !== undefined && !slot.deleted) {
            this.set(slot.key, slot.value);
        }
    }
};


// Write an algorithm to check whether any permutation of a string 
// is a palindrome (a string which reads the same forwards and 
// backwards). For example, "madam", "amadm" and "cllci" should 
// all return true, whereas "caabl" and "aaxxis" should return false.

function isPalindrome(str) {
	var hashMap = new HashMap()
	

	for (var i = 0, len = str.length; i < len; i++) {
		if (hashMap.get(str[i])) {
			hashMap.remove(str[i])
		} else {
			hashMap.set(str[i], "odd")
		}
	}

	return hashMap.length <= 1
}

// javascript object implementation
function isPalindrome2(str) {
	var hashMap = {}

	for (var i = 0, len = str.length; i < len; i++) {
		if (hashMap[str[i]]) {
			delete hashMap[str[i]]
		} else {
			hashMap[str[i]] = "odd"
		}
	}

	return Object.keys(hashMap).length <= 1
}


// Write an algorithm to group a list of words into anagrams. For 
// example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 
// 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], [
// 'cars', 'arcs'], ['acre', 'race']].
// [{acer: [acre, race]}, {aest: [east, teas, eats]}, {}]

var words = ['east', 'cars', 'acre', 'arcs', 'teas', 
'eats', 'race']

/**

hashmap

a ---> stuffA -> stuffB
b ---> stuffC -> stuffD
c
d

**/

function groupAnagram(arr) {
	var anagrams = []
	var hashMap = new HashMap()

	for (var i = 0, len = arr.length; i < len; i++) {
		var temp = arr[i].split('').sort().join('')

		if (hashMap.get(temp)) {
			hashMap.get(temp).push(arr[i])
		} else {
			var tempArr = []

			tempArr.push(arr[i])
			hashMap.set(temp, tempArr)
		}

	}

	var anagramItems = hashMap._slots

	anagramItems.forEach(function(item) {
		var temp = {}
		temp[item.key] = item.value
		anagrams.push(temp)
	})

	console.log(hashMap._slots)
	var hashArray = Object.keys(hashMap)
	console.log(anagrams)
	return anagrams
}


// Write a hash map implementation which uses separate chaining.

// we need some function to show what we're adding to our linked list
// use set




















