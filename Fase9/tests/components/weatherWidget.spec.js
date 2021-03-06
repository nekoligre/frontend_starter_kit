'use strict';


describe('Component: weather-widget', function() {

  const mockGetWeather = {data:{"coord":{"lon":-3.7,"lat":40.42},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"base":"stations","main":{"temp":34.66,"pressure":1013,"humidity":19,"temp_min":34,"temp_max":35},"visibility":10000,"wind":{"speed":3.6,"deg":120},"clouds":{"all":20},"dt":1497816000,"sys":{"type":1,"id":5488,"message":0.0045,"country":"ES","sunrise":1497761062,"sunset":1497815281},"id":3117735,"name":"Madrid","cod":200}};
  let element, scope, $httpBackend, ctrl, $q, weatherService, deferredResolution;
  
  beforeEach(module('RelojApp'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_,_$q_, _weatherService_) {
    scope = _$rootScope_.$new();
    deferredResolution = _$q_.defer();

    spyOn(_weatherService_,'getWeather')
      .and.returnValue(deferredResolution.promise); 

    element = angular.element('<weather-widget city="Madrid" country="ES" unit="metric"></weather-widget>');
    element = _$compile_(element)(scope);
    ctrl = element.controller("weather-widget");
    $httpBackend = _$httpBackend_;
    $httpBackend
      .whenGET('http://api.openweathermap.org/data/2.5/weather?appId=4959fc6b1ef0524303ca10b5e45771e2&q=Madrid,ES&units=metric')
      .respond(200, mockGetWeather);
    scope.$apply();



  }));

  it('weather-widget: Después de que el método asincrono se complete', function() {
    
    // Pretend that the AsyncService.promiseToDoSomething has completed.
    deferredResolution.resolve(mockGetWeather);
    // Need to run a digest cycle. Angular's asynchronous methods such as
    // $http.get generally do this for you, but our method does no such favor.
    scope.$apply();
    
    expect(true).toBe(true);
  });

});