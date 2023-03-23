const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { insertSales, getSales, getSalesById, deleteSales } = require('../../../src/controllers/sales')

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

      sinon.restore()

    });


    it('should call the next middleware function with an error if getById throws an error', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = {
        params: {id: '1'}
      }
      const next = sinon.stub()

      const error = new Error('Product not found');
      const getSalesByIdStub = sinon.stub(sales, 'getSalesById').throws(error);

      await getSalesById(req, res, next);

      expect(getSalesByIdStub.calledOnceWithExactly('1')).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWithExactly(error)).to.be.true;
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

      sinon.restore()

    });

    it('should call the next middleware function with an error if getById throws an error', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = {
        body: mockInsertSales
      }
      const next = sinon.stub()

      const error = new Error('Product not found');
      const insertSalesStub = sinon.stub(sales, 'insertSales').throws(error);

      await insertSales(req, res, next);

      expect(insertSalesStub.calledOnceWithExactly(mockInsertSales)).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWithExactly(error)).to.be.true;
    });


  });


  describe('Delete sales by Id', () => {
    it('should delete a sale / status code 204 ', async () => {
      const res = {}
      const req = {
        params: { id: 1 }
      }
      const next = () => { }

      res.status = sinon.stub().returns(res);
      sinon.stub(sales, 'deleteSales').resolves();

      await deleteSales(req, res, next);

      expect(res.status).to.have.been.calledWith(204)

      sinon.restore()

    });


    it('should call the next middleware function with an error if getById throws an error', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = {
        params: { id: '1' }
      }
      const next = sinon.stub()

      const error = new Error('Product not found');
      const deleteSalesStub = sinon.stub(sales, 'deleteSales').throws(error);

      await deleteSales(req, res, next);

      expect(deleteSalesStub.calledOnceWithExactly('1')).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWithExactly(error)).to.be.true;
    });

  });

});
