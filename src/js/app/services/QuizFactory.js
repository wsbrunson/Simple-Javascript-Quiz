var QuizFactory = function($http, $q) {
  var service   = {};
  var baseUrl   = 'https://api.myjson.com/bins/'
  var _quizCode = '';
  var _finalUrl = '';

  function makeUrl() {
    _finalUrl = baseUrl + _quizCode;
    return _finalUrl;
  }

  service.setQuizCode = function(quizCode) {
    _quizCode = quizCode;
    console.log('Quiz Code from Factory: ', _quizCode);
  }

  service.getQuizCode = function() {
    return _quizCode;
  }
  
  service.callJson = function() {
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: _finalUrl
    }).success(function(data){
      deferred.resolve(data);
    }).error(function(){
      deferred.reject('There was an error')
    })
  }

  return service;
};

module.exports = QuizFactory;
