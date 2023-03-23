const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { getAll, getById , insertProduct , updateProduct, deleteProduct} = require('../../../src/controllers/products')

// const errorHandler =  require('../../../src/middlewares/errorHandler')

const  products  = require('../../../src/services/products')

const { productsMock, productByIdMock , ProductUpdateMock} = require('../mocks/productsMock');

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
      const next = sinon.stub()

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(products, 'getById').resolves(productByIdMock);

      await getById(req, res, next);
      
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productByIdMock)

      sinon.restore();

    });

    it('should call the next middleware function with an error if getById throws an error', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = {
        params: {
          id: '3'
        }
      }
      const next = sinon.stub()

      const error = new Error('Product not found');
      const getByIdProductStub = sinon.stub(products, 'getById').throws(error);

      await getById(req, res, next);

      expect(getByIdProductStub.calledOnceWithExactly('3')).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWithExactly(error)).to.be.true;
    });


  });

  describe('Post a product', () => {
    it('should return only the new posted product and status code 201 ', async () => {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = {
        body: {
          name: 'Mascara do Miranha'
        }
      }
      const next = sinon.stub()
      const product = { name: 'Mascara do Miranha' };
      const insertProductStub = sinon.stub(products, 'insertProduct').returns(product);

      await insertProduct(req, res, next);

      expect(insertProductStub.calledOnceWithExactly( 'Mascara do Miranha')).to.be.true;
      expect(res.status.calledOnceWithExactly(201)).to.be.true;
      expect(res.json.calledOnceWithExactly(product)).to.be.true;
      expect(next.notCalled).to.be.true;

      sinon.restore();


    });

    it('should call the next middleware function with an error if insertProduct throws an error', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = {
        body: {
          name: 'Mascara do Miranha'
        }
      }
      const next = sinon.stub()

      const error = new Error('Product not found');
      const insertProductStub = sinon.stub(products, 'insertProduct').throws(error);

      await insertProduct(req, res, next);

      expect(insertProductStub.calledOnceWithExactly( 'Mascara do Miranha')).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWithExactly(error)).to.be.true;
    });
    


  });

  describe('Update a product', () => {
    it('should return only the new updated product and status code 200 ', async () => {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = { 
        params: {
          id: '1'
        },
        body: {
          name: 'Mascara do Miranha'
        }
      }
      const next = sinon.stub()
      const product = { id: '1', name: 'Mascara do Miranha' };
      const updateProductStub = sinon.stub(products, 'updateProduct').returns(product);

      await updateProduct(req, res, next);

      expect(updateProductStub.calledOnceWithExactly('1', 'Mascara do Miranha')).to.be.true;
      expect(res.status.calledOnceWithExactly(200)).to.be.true;
      expect(res.json.calledOnceWithExactly(product)).to.be.true;
      expect(next.notCalled).to.be.true;

      sinon.restore();

    });

    it('should call the next middleware function with an error if updateProduct throws an error', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }
      const req = {
        params: {
          id: '1'
        },
        body: {
          name: 'Mascara do Miranha'
        }
      }
      const next = sinon.stub()

      const error = new Error('Product not found');
      const updateProductStub = sinon.stub(products, 'updateProduct').throws(error);

      await updateProduct(req, res, next);

      expect(updateProductStub.calledOnceWithExactly('1', 'Mascara do Miranha')).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWithExactly(error)).to.be.true;
    });


  });


  describe('Delete a product', () => {
    it('should return only status code 204 ', async () => {
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub()
      }
      const req = {
        params: {
          id: '1'
        },
      }
      const next = sinon.stub()
      const deleteProductStub = sinon.stub(products, 'deleteProduct').returns();

      await deleteProduct(req, res, next);

      expect(deleteProductStub.calledOnceWithExactly('1')).to.be.true;
      expect(res.status.calledOnceWithExactly(204)).to.be.true;
      expect(res.send.calledOnceWithExactly()).to.be.true;
      expect(next.notCalled).to.be.true;

      sinon.restore();

    });

    it('should call the next middleware function with an error if updateProduct throws an error', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        // json: sinon.stub()
      }
      const req = {
        params: {
          id: '8456465'
        },
      }
      const next = sinon.stub()

      const error = new Error('Product not found');
      const updateProductStub = sinon.stub(products, 'deleteProduct').throws(error);

      await deleteProduct(req, res, next);

      expect(updateProductStub.calledOnceWithExactly('8456465')).to.be.true;
      expect(res.status.notCalled).to.be.true;
      // expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWithExactly(error)).to.be.true;
    });


  });

});
