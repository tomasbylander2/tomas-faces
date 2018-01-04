'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  it('should redirect `index.html` to `index.html#!/faces', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toBe('/faces');
  });

  describe('View: face list', function() {

    beforeEach(function() {
      browser.get('index.html#!/faces');
    });

    it('should filter the face list as a user types into the search box', function() {
      var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
      var query = element(by.model('$ctrl.query'));

      expect(phoneList.count()).toBe(8);

      query.sendKeys('angry');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('thinking');
      expect(phoneList.count()).toBe(1);
    });

    it('should be possible to control face order via the drop-down menu', function() {
      var queryField = element(by.model('$ctrl.query'));
      var orderSelect = element(by.model('$ctrl.orderProp'));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var phoneNameColumn = element.all(by.repeater('phone in $ctrl.phones').column('phone.name'));

      function getNames() {
        return phoneNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('Philosofical');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Philosofical Tomas'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'Philosofical Tomas'
      ]);
    });

    it('should render phone specific links', function() {
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('happy');

      element.all(by.css('.phones li a')).first().click();
      expect(browser.getLocationAbsUrl()).toBe('/faces/happy-tomas');
    });

  });

  describe('View: Face detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/faces/confused-tomas');
    });

    it('should display the `Confused Tomas` page', function() {
      expect(element(by.binding('$ctrl.phone.name')).getText()).toBe('A confused Tomas Bylander');
    });

    it('should display the first face image as the main phone image', function() {
      var mainImage = element(by.css('img.phone.selected'));

      expect(mainImage.getAttribute('src')).toMatch(/img\/faces\/confused-tomas1.jpg/);
    });

    it('should swap the main image when clicking on a thumbnail image', function() {
      var mainImage = element(by.css('img.phone.selected'));
      var thumbnails = element.all(by.css('.phone-thumbs img'));

      thumbnails.get(2).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/faces\/confused-tomas3.jpg/);

      thumbnails.get(0).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/faces\/confused-tomas1.jpg/);
    });

  });

});
