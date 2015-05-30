function QuizFactory ($http, $q) {
  'use strict';

  var service   = {};
  var baseUrl   = 'https://api.myjson.com/bins/';
  var _quizCode = '';
  var _finalUrl = '';

  function makeUrl() {
    _finalUrl = baseUrl + _quizCode;
    return _finalUrl;
  }

  service.setQuizCode = function(quizCode) {
    _quizCode = quizCode;
    console.log('Quiz Code from Factory: ', _quizCode);
  };

  service.getQuizCode = function() {
    return _quizCode;
  };

  service.callJson = function() {
    makeUrl();
    console.log('callJson url: ', _finalUrl);

    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: _finalUrl
    })
    .success(function(data) {
      data.forEach(function(element, index){
        element.questionNumber = index;
      });
      deferred.resolve(data);
    })
    .error(function () {
      deferred.reject('There was an error');
    });
    return deferred.promise;
  };

  return service;
}

module.exports = QuizFactory;
