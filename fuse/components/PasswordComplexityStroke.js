var passwordComplexityObject = this.ObserveFunction.inner();
var passwordComplexity = passwordComplexityObject.map(function(object) {
    return object;
});

module.exports = {
    passwordComplexity: passwordComplexity
};