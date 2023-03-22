const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { getAll, getById } = require('../../../src/controllers/products')

// const errorHandler =  require('../../../src/middlewares/errorHandler')

const  products  = require('../../../src/services/products')

const { productsMock, productByIdMock } = require('../mocks/productsMock');

describe('Products Controller tests', () => {
  describe('Testing Function getAll', () => {
    it('should return an array of all products and status code 200 ', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(products, 'getAll').resolves(productsMock);


      await getAll(req, res);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productsMock)
    });
  });

  describe('Get product by Id', () => {
    it('should return only one product and status code 200 ', async () => {
      const res = {}
      const req = {
        params: { id: 3 }
      }
      // const error = 'Product not found'
      // const next = () => errorHandler()

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(products, 'getById').resolves(productByIdMock);

      await getById(req, res);
      
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productByIdMock)

    });


  });
});
