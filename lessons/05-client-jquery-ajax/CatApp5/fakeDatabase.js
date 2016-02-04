
var FakeDatabase = module.exports = {

    data: [],

    add: function(obj) {
        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
        function compare(a,b) {
            return b.age-a.age;
        }
        FakeDatabase.data.sort(compare);
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return FakeDatabase.data.slice();
    },

    remove: function(index) {
        //removes item located at index in array and returns it
        return FakeDatabase.data.splice(index,1);
    }
}