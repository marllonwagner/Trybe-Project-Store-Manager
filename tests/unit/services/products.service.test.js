const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { getAll, getById, insertProduct, updateProduct, deleteProduct, httpErrGenerator } = require('../../../src/services/products')

const products = require('../../../src/models/products')

const { productsMock, productByIdMock } = require('../mocks/productsMock');

describe('Products Services tests', () => {
  describe('Testing Function getAll', () => {
    it('should return an array with all products', async () => {

      sinon.stub(products, 'getAll').resolves(productsMock);


      await getAll();

    });
  });

  describe('Get product by Id', () => {
    it('should return only one product', async () => {
      const req = {
        params: { id: 3 }
      }


      sinon.stub(products, 'getById').resolves(productByIdMock);

      await getById(req);

    });

        it('should return an error if id is invalid', async () => {
      const req = {
        params: { id: 9 }
      }

          
      sinon.stub(products, 'getById').resolves(undefined);
          
     
    
        });
    
    it('should throw a 404 error if product is not found', async () => {
      const getByIdProductStub = sinon.stub(products, 'getById').returns(0);
      const id = '1';
     

      try {
        await getById(id);
      } catch (err) {
        expect(err).to.eql(httpErrGenerator(404, 'Product not found'));
      }

      expect(getByIdProductStub.calledOnceWithExactly(id)).to.be.true;
    });
    
    
    
  });

  describe('Testing Function insertProduct', () => {
    it('should return the new inserted product', async () => {

      sinon.stub(products, 'insertProduct').resolves({id:1 , name : 'produto'});


      await insertProduct();

    });
  });


  describe('Testing Function updateProduct', () => {
    it('should return the new updated product', async () => {

      sinon.stub(products, 'updateProduct').resolves({ id: 1, name: 'produto' });


      await updateProduct();

    });

    it('should throw a 404 error if product is not found', async () => {
      const updateProductStub = sinon.stub(products, 'updateProduct').returns(0);
      const id = '1';
      const name = 'produto';

      try {
        await updateProduct(id, name);
      } catch (err) {
        expect(err).to.eql(httpErrGenerator(404, 'Product not found'));
      }

      expect(updateProductStub.calledOnceWithExactly(id, name)).to.be.true;
    });
  });


  describe('Testing Function deleteProduct', () => {
    it('should return nothing', async () => {

      sinon.stub(products, 'deleteProduct').resolves();
      await deleteProduct();

    });

    it('should throw a 404 error if product is not found', async () => {
      const updateProductStub = sinon.stub(products, 'deleteProduct').returns(0);
      const id = '1';
   
      try {
        await deleteProduct(id);
      } catch (err) {
        expect(err).to.eql(httpErrGenerator(404, 'Product not found'));
      }
      expect(updateProductStub.calledOnceWithExactly(id)).to.be.true;
    });

  });

  afterEach(sinon.restore);
});
