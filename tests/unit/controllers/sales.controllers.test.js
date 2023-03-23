const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { insertSales, getSales, getSalesById } = require('../../../src/controllers/sales')

// const errorHandler =  require('../../../src/middlewares/errorHandler')

const sales = require('../../../src/services/sales')

const { mockGetSaleById, mockGetSales, mockInsertSales } = require('../mocks/salesMock');

describe('Sales Controller tests', () => {
  describe('Testing Function getSales', () => {
    it('should return an array of all sales and status code 200 ', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(sales, 'getSales').resolves(mockGetSales);


      await getSales(req, res);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(mockGetSales)
    });
  });

  describe('Get sales by Id', () => {
    it('should return sales with specified id and status code 200 ', async () => {
      const res = {}
      const req = {
        params: { id: 1 }
      }
      const next = () => { }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(sales, 'getSalesById').resolves(mockGetSaleById);

      await getSalesById(req, res, next);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(mockGetSaleById)

    });


  });

  describe('Post a sale', () => {
    it('should return the new posted sale and status code 201 ', async () => {
      const res = {}
      const req = mockInsertSales
      const next = () => { }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(sales, 'insertSales').resolves();

      await insertSales(req, res, next);

    });


  });
});
