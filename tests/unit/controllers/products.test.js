const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { getAll, getById , insertProduct } = require('../../../src/controllers/products')

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
      const next = () => { }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(products, 'getById').resolves(productByIdMock);

      await getById(req, res, next);
      
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productByIdMock)

    });


  });

  describe('Post a product', () => {
    it('should return only the new posted product and status code 201 ', async () => {
      const res = {}
      const req = {
        name: 'Product Y'
      }
      const next = () => {}
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(products, 'insertProduct').resolves();
      
      await insertProduct(req, res , next);

      // expect(res.status).to.have.been.calledWith(201)
      // expect(res.json).to.have.been.calledWith()

    });


  });
});
