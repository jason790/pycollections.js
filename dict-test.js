// Tests for dict.js.

describe('Dict constructed with no args', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict();
  });

  it('Has length of 0', function() {
    expect(dict.length()).toBe(0);
  });

  it('Has no items', function() {
    expect(dict.items()).toEqual([]);
  });

  it('Has no keys', function() {
    expect(dict.keys()).toEqual([]);
  });

  it('Has no values', function() {
    expect(dict.values()).toEqual([]);
  });

  var possibleKeys = [
      0, 1,
      '', 'a',
      false, true
  ];

  it('Does not contain anything', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
  });

  it('Throws an error from get() with any key and no defaultValue', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.get.bind(dict, key)).toThrow();
    });
  });

  it('Returns defaultValue from get() with any key and a defaultValue', function() {
    var defaultValue = {1: 2};
    possibleKeys.forEach(function(key) {
      expect(dict.get(key, defaultValue)).toBe(defaultValue);
    });
  });
});


describe('Dict constructed with empty Array', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict([]);
  });

  it('Has length of 0', function() {
    expect(dict.length()).toBe(0);
  });

  it('Has no items', function() {
    expect(dict.items()).toEqual([]);
  });

  it('Has no keys', function() {
    expect(dict.keys()).toEqual([]);
  });

  it('Has no values', function() {
    expect(dict.values()).toEqual([]);
  });

  var possibleKeys = [
      0, 1,
      '', 'a',
      false, true
  ];

  it('Does not contain anything', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
  });

  it('Throws an error from get() with any key and no defaultValue', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.get.bind(dict, key)).toThrow();
    });
  });

  it('Returns defaultValue from get() with any key and a defaultValue', function() {
    var defaultValue = {1: 2};
    possibleKeys.forEach(function(key) {
      expect(dict.get(key, defaultValue)).toBe(defaultValue);
    });
  });
});


describe("Dict constructed with Array of 2 unique key-value pairs: one representing the key 'a' and another for 'b'", function() {
  var dict;

  var constructorArgs = [
    ['a', 1],
    ['b', 99]
  ];

  beforeEach(function() {
    dict = new Dict(constructorArgs);
  });

  it('Has length of 2', function() {
    expect(dict.length()).toBe(2);
  });

  it('Has 2 items that match the constructor key-value pairs', function() {
    var items = dict.items();
    expect(items.length).toBe(2);
    constructorArgs.forEach(function(keyValue) {
      expect(items).toContain(keyValue);
    });
  });

  it("Has 2 keys: 'a' and 'b'", function() {
    var keys = dict.keys();
    expect(keys.length).toBe(2);
    expect(keys).toContain('a');
    expect(keys).toContain('b');
  });

  it('Has 2 values corresponding to those in the "value" part of the key-value pairs passed to the constructor.', function() {
    var values = dict.values();
    expect(values.length).toBe(2);
    expect(values).toContain(1);
    expect(values).toContain(99);
  });

  // these don't contain 'a' or 'b'
  var possibleKeys = [
      0, 1,
      '', 'z',
      false, true,
  ];

  it('Contains only the keys "a" and "b"', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
    expect(dict.hasKey('a')).toBe(true);
    expect(dict.hasKey('b')).toBe(true);
  });

  it('Throws error from get() with non-present key and no defaultValue', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.get.bind(dict, key)).toThrow();
    });
  });

  it('Returns defaultValue from get() with any non-present key and a defaultValue', function() {
    var defaultValue = {1: 2};
    possibleKeys.forEach(function(key) {
      expect(dict.get(key, defaultValue)).toBe(defaultValue);
    });
  });

  it('Returns existing value from get() with existing key and a defaultValue', function() {
    var defaultValue = {1: 2};
    expect(dict.get('a', defaultValue)).toBe(1);
    expect(dict.get('b', defaultValue)).toBe(99);
  });
});


describe('Dict constructed with non-empty non-unique Array, with one key-value pair for key "a" and 2 key-value pairs whose key part is "b"', function() {
  var dict;

  var constructorArgs = [
    ['a', 1],
    ['b', 99],
    ['b', 100]
  ];

  beforeEach(function() {
    dict = new Dict(constructorArgs);
  });

  it('Has length of 2', function() {
    expect(dict.length()).toBe(2);
  });

  it('Has 2 items: one for the sole key "a" key-value pair from the constructor arg, and another from the final "b" key-value pair from the constructor arg.', function() {
    var items = dict.items();
    expect(items.length).toBe(2);
    expect(items).toContain(['a', 1]);
    expect(items).toContain(['b', 100]);
  });

  it('Has 2 keys: "a" and "b"', function() {
    var keys = dict.keys();
    expect(keys.length).toBe(2);
    expect(keys).toContain('a');
    expect(keys).toContain('b');
    expect(keys).not.toContain('basd');
  });

  it('Has 2 values: one corresponding to the value of the "a" key-value pair of the constructor arg, and another corresponding to the latest "b" key-value pair of the constructor arg.', function() {
    var values = dict.values();
    expect(values.length).toBe(2);
    expect(values).toContain(1);
    expect(values).toContain(100);
  });

  // these don't contain 'a' or 'b'
  var possibleKeys = [
      0, 1,
      '', 'z',
      false, true
  ];

  it('Contains only a and b', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
    expect(dict.hasKey('a')).toBe(true);
    expect(dict.hasKey('b')).toBe(true);
  });

  it('Throws error from get() with non-present key and no defaultValue', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.get.bind(dict, key)).toThrow();
    });
  });

  it('Returns defaultValue from get() with any non-present key and a defaultValue', function() {
    var defaultValue = {1: 2};
    possibleKeys.forEach(function(key) {
      expect(dict.get(key, defaultValue)).toBe(defaultValue);
    });
  });

  it('Returns existing value from get() with existing key and a defaultValue', function() {
    var defaultValue = {1: 2};
    expect(dict.get('a', defaultValue)).toBe(1);
    expect(dict.get('b', defaultValue)).toBe(100);
  });
});


describe('Dict after initialization with empty object as the arg', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict({});
  });

  it('Has length of 0', function() {
    expect(dict.length()).toBe(0);
  });

  it('Has no items', function() {
    expect(dict.items()).toEqual([]);
  });

  it('Has no keys', function() {
    expect(dict.keys()).toEqual([]);
  });

  it('Has no values', function() {
    expect(dict.values()).toEqual([]);
  });
});


describe('Dict after initialization with non-empty object containing "a" and "b" keys as the arg', function() {
  var dict;

  var constructorArgs = {
    'a': true,
    'b': [1, 2, 3]
  };

  beforeEach(function() {
    dict = new Dict(constructorArgs);
  });

  it('Has length of 2', function() {
    expect(dict.length()).toBe(2);
  });

  it('Has 2 items matching the key-value pairs of the constructor arg.', function() {
    var items = dict.items();
    expect(items.length).toBe(2);
    expect(items).toContain(['a', true]);
    expect(items).toContain(['b', [1, 2, 3]]);
  });

  it('Has 2 keys: "a" and "b"', function() {
    var keys = dict.keys();
    expect(keys.length).toBe(2);
    expect(keys).toContain('a');
    expect(keys).toContain('b');
    expect(keys).not.toContain('basd');
  });

  it('Has 2 values matching those of the constructor arg Object.', function() {
    var values = dict.values();
    expect(values.length).toBe(2);
    expect(values).toContain(true);
    expect(values).toContain([1, 2 ,3]);
  });

  // these don't contain 'a' or 'b'
  var possibleKeys = [
      0, 1,
      '', 'z',
      false, true
  ];

  it('Contains only a and b', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
    expect(dict.hasKey('a')).toBe(true);
    expect(dict.hasKey('b')).toBe(true);
  });

  it('Throws an error from get() with non-present key and no defaultValue', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.get.bind(dict, key)).toThrow();
    });
  });

  it('Returns defaultValue from get() with any non-present key and a defaultValue', function() {
    var defaultValue = {1: 2};
    possibleKeys.forEach(function(key) {
      expect(dict.get(key, defaultValue)).toBe(defaultValue);
    });
  });

  it('Returns existing value from get() with existing key and a defaultValue', function() {
    var defaultValue = {1: 2};
    expect(dict.get('a', defaultValue)).toBe(true);
    expect(dict.get('b', defaultValue)).toEqual([1, 2, 3]);
  });
});


describe('Dict after initialization with empty Dict as the arg', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict(new Dict({}));
  });

  it('Has length of 0', function() {
    expect(dict.length()).toBe(0);
  });

  it('Has no items', function() {
    expect(dict.items()).toEqual([]);
  });

  it('Has no keys', function() {
    expect(dict.keys()).toEqual([]);
  });

  it('Has no values', function() {
    expect(dict.values()).toEqual([]);
  });
});


describe('Dict after initialization with non-empty Dict containing keys "a" and "b" as the arg', function() {
  var dict;

  var constructorArgs = new Dict({
    'a': true,
    'b': [1, 2, 3]
  });

  beforeEach(function() {
    dict = new Dict(constructorArgs);
  });

  it('Has length of 2', function() {
    expect(dict.length()).toBe(2);
  });

  it('Has 2 items', function() {
    var items = dict.items();
    expect(items.length).toBe(2);
    expect(items).toContain(['a', true]);
    expect(items).toContain(['b', [1, 2, 3]]);
  });

  it('Has 2 keys', function() {
    var keys = dict.keys();
    expect(keys.length).toBe(2);
    expect(keys).toContain('a');
    expect(keys).toContain('b');
    expect(keys).not.toContain('basd');
  });

  it('Has 2 values', function() {
    var values = dict.values();
    expect(values.length).toBe(2);
    expect(values).toContain(true);
    expect(values).toContain([1, 2 ,3]);
  });

  // these don't contain 'a' or 'b'
  var possibleKeys = [
      0, 1,
      '', 'z',
      false, true
  ];

  it('Contains only a and b', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
    expect(dict.hasKey('a')).toBe(true);
    expect(dict.hasKey('b')).toBe(true);
  });

  it('Throws an error from get() with non-present key and no defaultValue', function() {
    possibleKeys.forEach(function(key) {
      expect(dict.get.bind(dict, key)).toThrow();
    });
  });

  it('Returns defaultValue from get() with any non-present key and a defaultValue', function() {
    var defaultValue = {1: 2};
    possibleKeys.forEach(function(key) {
      expect(dict.get(key, defaultValue)).toBe(defaultValue);
    });
  });

  it('Returns existing value from get() with existing key and a defaultValue', function() {
    var defaultValue = {1: 2};
    expect(dict.get('a', defaultValue)).toBe(true);
    expect(dict.get('b', defaultValue)).toEqual([1, 2, 3]);
  });
});


describe('Dict constructed with non Dict/Object arg', function() {
  var getDictMaker = function(v) {
    return function() {
      return new Dict(v);
    };
  };

  it('Should throw an error when constructed with a Number', function() {
    var numbers = [0, 1, 0.5, 3, -1];
    numbers.forEach(function(num) {
      expect(getDictMaker(num)).toThrow();
    });
  });

  it('Should throw an error when constructed with a String', function() {
    var strings = ['', 'a', 'Aojidf', '123', ' \n '];
    strings.forEach(function(str) {
      expect(getDictMaker(str)).toThrow();
    });
  });

  it('Should throw an error when constructed with a Boolean', function() {
    var bools = [false, true];
    bools.forEach(function(bool) {
      expect(getDictMaker(bool)).toThrow();
    });
  });
});


describe('Dict.hasKey', function() {
  it('Should return false for all keys for an empty dict.', function() {
    var dict = new Dict();
    [0, 1, false, true, '', 'a'].forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
  });

  it('Should return true for an existing key', function() {
    var dict = new Dict({'a': 1});
    expect(dict.hasKey('a')).toBe(true);
  });
});


describe('Dict.isEmpty', function() {
  it('Should be true for a dict that has no keys set', function() {
    var dict = new Dict();
    expect(dict.isEmpty()).toBe(true);
  });

  it('Should be false for a dict that has had at least 1 key set on it', function() {
    var dict = new Dict({'a': 1});
    expect(dict.isEmpty()).toBe(false);

    var dict = new Dict();
    dict.set('a', 1);
    expect(dict.isEmpty()).toBe(false);

    var dict = new Dict();
    dict.update(['a', 1]);
    expect(dict.isEmpty()).toBe(false);
  });
});


describe('Dict.modify', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict();
  });

  it('Should throw an error if not given a function as its second arg.', function() {
    expect(dict.modify.bind(dict)).toThrow();
    expect(dict.modify.bind(dict, 123)).toThrow();
  });

  it('Should not affect any keys given an identity function', function() {
    var keyA = 'a';
    var keyB = 'B';
    var valueA = 1;
    var valueB = 2;
    dict.set(keyA, valueA);
    dict.set(keyB, valueB);

    var identity = function(v) {
      return v;
    };
    dict.modify(keyA, identity);
    dict.modify(keyB, identity);

    expect(dict.get(keyA)).toBe(valueA);
    expect(dict.get(keyB)).toBe(valueB);
  });

  it('Should always set a key to the value returned by a function that always returns the same value', function() {
    var keyA = 'a';
    var keyB = 'B';
    var valueA = 123;
    var valueB = 987;
    dict.set(keyA, valueA);
    dict.set(keyB, valueB);

    var getOne = function() { return 1; };
    dict.modify(keyA, getOne);
    dict.modify(keyB, getOne);

    expect(dict.get(keyA)).toBe(1);
    expect(dict.get(keyB)).toBe(1);
  });

  it('Should modify the value of a key based on a function that operates on the current value, key, and the dict itself', function() {
    var multiplier = 2;
    var yeaKey = 'yea!';
    var modifier = function(value, key, theDict) {
      expect(theDict).toBe(dict);
      expect(theDict.hasKey(key)).toBe(true);
      expect(theDict.get(key)).toBe(value);

      var result = {};
      result[yeaKey] = value * multiplier;
      return result;
    };

    var originalValueOfA = 1;
    var keyA = 'a';
    dict.set(keyA, originalValueOfA);
    dict.modify(keyA, modifier);
    var newA = dict.get(keyA);
    expect(newA[yeaKey]).toBe(originalValueOfA * multiplier)
  });
});


describe('Dict.checkKeyIsHashable', function() {
  it('Should throw an error for objects, arrays, and dicts', function() {
    var keys = [
      {},
      [],
      new Dict()
    ];
    keys.forEach(function(key) {
      expect(Dict.checkKeyIsHashable_.bind(null, key)).toThrow();
    });
  });

  it('Should not throw an error for numbers, strings, and booleans', function() {
    var keys = [
      0, 1,
      '', 'a',
      false, true
    ];
    keys.forEach(function(key) {
      expect(Dict.checkKeyIsHashable_.bind(null, key)).not.toThrow();
    });
  });
});


describe('Dict.values', function() {
  it('Should return the values corresponding to each unique key, regardless of uniqueness', function() {
    var dict = new Dict({'a': 1, 'b': 1, 'c': 1});
    expect(dict.length()).toBe(3);
    expect(dict.values()).toEqual([1, 1, 1]);
  });
});


describe('Dict.keys', function() {
  it('Should return the most recent set of unique keys', function() {
    var dict = new Dict();
    var letterA = 'a';
    var secondValue = 2;
    dict.update([
      [letterA, 1],
      [letterA, secondValue]
    ]);
    expect(dict.keys()).toEqual([letterA]);
    expect(dict.hasKey(letterA)).toBe(true);
    expect(dict.get(letterA)).toBe(secondValue);
  });

  it('Should return keys of boolean, number, string, and undefined types.', function() {
    var keysOfAllTypes = [
      false, true,
      0, 1,
      '', 'a',
      undefined
    ];
    var dict = Dict.fromKeys(keysOfAllTypes, 1);
    var keys = dict.keys();
    keysOfAllTypes.forEach(function(key) {
      expect(keys.indexOf(key)).toBeGreaterThan(-1);
    });
  });
});


describe('Dict.fromKeys', function() {
  it('Should set all supplied keys to the same value.', function() {
    var theValue = {1: 2, 3: {4: 5}};
    var keys = ['a', 'b', 'c'];
    var dict = Dict.fromKeys(keys, theValue);
    expect(dict.keys()).toEqual(keys);
    dict.values().forEach(function(value) {
      expect(value).toBe(theValue);
    });
    dict.iteritems(function(key, value) {
      expect(keys).toContain(key);
      expect(value).toBe(theValue);
    });
  });
});


describe('Dict.set', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict();
  });

  it('Should throw an error unless called with 2 args.', function() {
    expect(dict.set.bind(dict, 1)).toThrow();
    expect(dict.set.bind(dict, 1, 2)).not.toThrow();
  });

  it('Should set a string type key to a value and get it.', function() {
    var key = 'yea';
    var value = {1: 2};
    dict.set(key, value);
    expect(dict.get(key)).toBe(value);
  });

  it('Should set a number type key (but not its corresponding string key) to a value and get it.', function() {
    var numericKey = 1;
    var stringKey = String(numericKey);
    expect(stringKey).toBe('1');
    var numericValue = {1: 2};
    dict.set(numericKey, numericValue);
    expect(dict.get(numericKey)).toBe(numericValue);
    expect(dict.get.bind(dict, stringKey)).toThrow();

    var stringValue = {3: 4};
    dict.set(stringKey, stringValue);
    expect(dict.get(numericKey)).toBe(numericValue);
    expect(dict.get(stringKey)).toBe(stringValue);
  });

  it('Should set a boolean type key (but not its corresponding string key) to a value and get it.', function() {
    var boolValue = {1: 2};
    var boolKey = false;
    var stringKey = String(boolKey);
    expect(stringKey).toBe('false');
    dict.set(boolKey, boolValue);
    expect(dict.get(boolKey)).toBe(boolValue);
    expect(dict.get.bind(dict, stringKey)).toThrow();

    var stringValue = {3: 4};
    dict.set(stringKey, stringValue);
    expect(dict.get(boolKey)).toBe(boolValue);
    expect(dict.get(stringKey)).toBe(stringValue);
  });

  it('Should set undefined key (but not its corresponding string key) to a value and get it.', function() {
    var undefinedValue = {1: 2};
    var undefinedKey = undefined;
    var stringKey = String(undefinedKey);
    expect(stringKey).toBe('undefined');
    dict.set(undefinedKey, undefinedValue);
    expect(dict.get(undefinedKey)).toBe(undefinedValue);
    expect(dict.get.bind(dict, stringKey)).toThrow();

    var stringValue = {3: 4};
    dict.set(stringKey, stringValue);
    expect(dict.get(undefinedKey)).toBe(undefinedValue);
    expect(dict.get(stringKey)).toBe(stringValue);
  });

  it('Should not allow setting a key of type object or array, or a null key.', function() {
    var badKeys = [
      [1, 2],
      {3: 'asdf'},
      null
    ];
    badKeys.forEach(function(key) {
      expect(dict.set.bind(dict, key, 987)).toThrow();
    });
  });

  it('Should update an existing key value pair after re-setting a key.', function() {
    expect(dict.length()).toBe(0);

    var theKey = 'key';
    var oldValue = 1;
    dict.set(theKey, oldValue);
    var oldKeys = dict.keys();

    expect(dict.length()).toBe(1);
    expect(dict.get(theKey)).toBe(oldValue);

    var newValue = 8765;
    dict.set(theKey, newValue);
    var newKeys = dict.keys();

    expect(dict.length()).toBe(1);
    expect(dict.get(theKey)).not.toBe(oldValue);
    expect(dict.get(theKey)).toBe(newValue);

    expect(oldKeys).toEqual(newKeys);
  });
});


describe('Dict.clear', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict();
  });

  it('should not affect keys, values, or items of an empty dict.', function() {
    var oldValues = dict.values();
    var oldKeys = dict.keys();
    var oldItems = dict.items();

    dict.clear();

    var newValues = dict.values();
    var newKeys = dict.keys();
    var newItems = dict.items();

    expect(newValues).toEqual(oldValues);
    expect(newKeys).toEqual(oldKeys);
    expect(newItems).toEqual(oldItems);
  });

  it('should remove all items from a dict but not references to those items.', function() {
    dict.set('key', 123);
    var oldValues = dict.values();
    var oldKeys = dict.keys();
    var oldItems = dict.items();

    expect(oldValues).toEqual([123]);
    expect(oldKeys).toEqual(['key']);
    expect(oldItems).toEqual([['key', 123]]);

    expect(dict.length()).toBe(1);

    dict.clear();

    expect(dict.length()).toBe(0);

    var newValues = dict.values();
    var newKeys = dict.keys();
    var newItems = dict.items();

    expect(newValues).toEqual([]);
    expect(newKeys).toEqual([]);
    expect(newItems).toEqual([]);

    expect(oldValues).toEqual([123]);
    expect(oldKeys).toEqual(['key']);
    expect(oldItems).toEqual([['key', 123]]);
  });
});


describe('Dict.copy', function() {
  var original;

  beforeEach(function() {
    original = new Dict();
  });

  it('should create an exact copy of, but not a reference to, an empty dict.', function() {
    var copied = original.copy();

    expect(copied).not.toBe(original);

    expect(copied.values()).toEqual(original.values());
    expect(copied.keys()).toEqual(original.keys());
    expect(copied.items()).toEqual(original.items());

    // setting a key on either copy should not affect the other.
    var keyToSet = 'key';
    copied.set(keyToSet, 123);
    expect(original.get.bind(original, keyToSet)).toThrow();
    expect(original.get(keyToSet, 'default')).toBe('default');

    var anotherKeyToSet = 'yea';
    original.set(anotherKeyToSet, 987);
    expect(copied.get.bind(copied, anotherKeyToSet)).toThrow();
    expect(copied.get(anotherKeyToSet, 'default')).toBe('default');
  });

  it('should create an exact copy of, but not a reference to, a non-empty dict.', function() {
    original.set('previouslySetKey', 'previouslySetValue');

    var copied = original.copy();

    expect(copied).not.toBe(original);

    expect(copied.values()).toEqual(original.values());
    expect(copied.keys()).toEqual(original.keys());
    expect(copied.items()).toEqual(original.items());

    // setting a key on either copy should not affect the other.
    var keyToSet = 'key';
    copied.set(keyToSet, 123);
    expect(original.get.bind(original, keyToSet)).toThrow();
    expect(original.get(keyToSet, 'default')).toBe('default');

    var anotherKeyToSet = 'yea';
    original.set(anotherKeyToSet, 987);
    expect(copied.get.bind(copied, anotherKeyToSet)).toThrow();
    expect(copied.get(anotherKeyToSet, 'default')).toBe('default');
  });
});


describe('Dict.del', function() {
  var dict;
  var existingKey = 'key';

  beforeEach(function() {
    dict = new Dict();
    dict.set(existingKey, 123);
  });

  it('Should remove an existing key successfully', function() {
    var getExistingKey = dict.get.bind(dict, existingKey);
    expect(dict.length()).toBe(1);
    expect(getExistingKey).not.toThrow();

    dict.del(existingKey);

    expect(dict.length()).toBe(0);
    expect(getExistingKey).toThrow();
  });

  it('Should raise an error removing a non-existing key', function() {
    expect(dict.del.bind(dict, 'non existing key')).toThrow();
  });
});


describe('Dict.pop', function() {
  var dict;
  var existingKey = 'key';
  var existingValue = {'a': 123};

  beforeEach(function() {
    dict = new Dict();
    dict.set(existingKey, existingValue);
  });

  it('Should remove and return an existing key successfully', function() {
    var getExistingKey = dict.get.bind(dict, existingKey);
    expect(dict.length()).toBe(1);
    expect(getExistingKey).not.toThrow();

    var popped = dict.pop(existingKey);
    expect(popped).toBe(existingValue);

    expect(dict.length()).toBe(0);
    expect(getExistingKey).toThrow();
  });

  it('Should raise an error removing a non-existing key', function() {
    expect(dict.pop.bind(dict, 'non existing key')).toThrow();
  });
});


describe('Dict.popitem', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict();
  });

  it('Should raise an error when executed on an empty dict.', function() {
    expect(dict.popitem.bind(dict)).toThrow();
  });

  it('Should return and delete the sole key-value pair from a dict with 1 key.', function() {
    var key = 'key';
    var value = 123;
    dict.set(key, value);
    var item = dict.items()[0];

    var popped = dict.popitem();
    expect(popped).toEqual(item);
    expect(dict.isEmpty()).toBe(true);
    expect(dict.length()).toBe(0);
  });
});


describe('Dict.hasKey', function() {
  var dict;

  beforeEach(function() {
    dict = new Dict();
  });

  it('Should return false for empty dict on all keys', function() {
    expect(dict.length()).toBe(0);
    expect(dict.isEmpty()).toBe(true);
    ['', 'a', 0, 1, true, false].forEach(function(key) {
      expect(dict.hasKey(key)).toBe(false);
    });
  });

  it('Should return true for an existing string key.', function() {
    var key = 'string';
    dict.set(key, 123);
    expect(dict.hasKey(key)).toBe(true);
    expect(dict.hasKey('not existing')).toBe(false);
  });

  it('Should return true for an existing numeric key and not its string counterpart', function() {
    var key = 100;
    dict.set(key, 123);
    expect(dict.hasKey(key)).toBe(true);
    expect(dict.hasKey(String(key))).toBe(false);

    expect(dict.hasKey(9999999)).toBe(false);
    expect(dict.hasKey('9999999')).toBe(false);
  });

  it('Should return true for an existing boolean key and not its string counterpart', function() {
    var key = true;
    dict.set(key, 123);
    expect(dict.hasKey(key)).toBe(true);
    expect(dict.hasKey(String(key))).toBe(false);

    expect(dict.hasKey(false)).toBe(false);
    expect(dict.hasKey('false')).toBe(false);
  });

  it('Should return true for an existing undefined key and its string counterpart', function() {
    var key = undefined;
    dict.set(key, 123);
    expect(dict.hasKey(key)).toBe(true);
    expect(dict.hasKey(String(key))).toBe(false);
  });
});
