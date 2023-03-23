const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

// const { expect } = chai;
chai.use(sinonChai);

const { getSales, getSalesById, insertSales } = require('../../../src/models/sales')

const connection = require('../../../src/models/connection')

const { mockGetSaleById, mockGetSales, mockInsertSales } = require('../mocks/salesMock');

describe('Sales models tests', () => {
  describe('Testing Function getSales', () => {
    it('should return an array with all Sales', async () => {

      sinon.stub(connection, 'execute').resolves(mockGetSales);


      await getSales();

    });
  });

  describe('Get sale by Id', () => {
    it('should return the specified sale by id', async () => {

      sinon.stub(connection, 'execute').resolves([[mockGetSaleById]]);


      await getSalesById(1)
    });

  });


  describe('Post array of Sales', () => {
    it('should return  ', async () => {

      sinon.stub(connection, 'execute').resolves([1]);


      await insertSales(mockInsertSales)
    });

  });

  afterEach(sinon.restore);

});

