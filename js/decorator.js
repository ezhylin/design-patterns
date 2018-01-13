var User = function(o) {
  this.name = o.name || 'Default Name';
  this.salary = o.salary || 1000;
  this.decorators = [];
};

User.prototype.getIncome = function() {
  return this.decorators.reduce(function(decoratedSalary, decorator) {
    var instance = this.constructor,
        name = decorator.name,
        value = decorator.value;
    return instance.decorators[name].call(this, decoratedSalary, value);
  }.bind(this), this.salary);
};

User.prototype.decorate = function(decorator) {
   this.decorators.push(decorator);
};

User.decorators = {
  addReferralBonus: function(salary, bonus) {
      return salary + bonus;
  },
  addOvertimeBonus: function(salary, hours) {
      var hourRate = (this.salary / 160) * 2;
      return salary + (hourRate * hours);
  },
  formatIncome: function(salary, symbol) {
      return salary + symbol;
  }
};

// create a user
var eugene = new User({name: 'Eugene'}); 

// add the user's bonuses
eugene.decorate({
  name: 'addOvertimeBonus',
  value: 32
});
eugene.decorate({
  name: 'addReferralBonus',
  value: 200
});
eugene.decorate({
  name: 'formatIncome',
  value: String.fromCharCode(parseInt('20B4', 16))
});

// calculate income
var income = eugene.getIncome();

console.log( income );