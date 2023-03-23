const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

// const { expect } = chai;
chai.use(sinonChai);

const { getSales, getSalesById, insertSales  } = require('../../../src/services/sales')

const sales = require('../../../src/models/sales')

const { mockGetSaleById, mockGetSales, mockInsertSales } = require('../mocks/salesMock');

describe('Sales Services tests', () => {
  describe('Testing Function getSales', () => {
    it('should return an array with all sales', async () => {

      sinon.stub(sales, 'getSales').resolves(mockGetSales);


      await getSales();

    });
  });

  describe('Get sales by Id', () => {
    it('should return the especific sales by id', async () => {
      const req = {
        params: { id: 1 }
      }


      sinon.stub(sales, 'getSalesById').resolves(mockGetSaleById);

      await getSalesById(req);

    });

    it('should return an error if id is invalid', async () => {
      const req = {
        params: { id: 9454 }
      }


      sinon.stub(sales, 'getSalesById').resolves();



    });

  });

  describe('Testing Function insertSales', () => {
    it('should return the new inserted sale', async () => {

      sinon.stub(sales, 'insertSales').resolves(mockInsertSales);


      await insertSales();

    });
  });

  afterEach(sinon.restore);
});
