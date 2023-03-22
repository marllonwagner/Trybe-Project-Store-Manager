const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

// const { expect } = chai;
chai.use(sinonChai);

const { getAll, getById, insertProduct } = require('../../../src/services/products')

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
    
  });

  describe('Testing Function insertProduct', () => {
    it('should return the new inserted product', async () => {

      sinon.stub(products, 'insertProduct').resolves({id:1 , name : 'produto'});


      await insertProduct();

    });
  });

  afterEach(sinon.restore);
});
