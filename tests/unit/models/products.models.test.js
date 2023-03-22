const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

// const { expect } = chai;
chai.use(sinonChai);

const { getAll, getById, insertProduct } = require('../../../src/models/products')

const connection = require('../../../src/models/connection')

const { productsMock, productByIdMock } = require('../mocks/productsMock');

describe('Products models tests', () => {
  describe('Testing Function getAll', () => {
    it('should return an array with all products', async () => {

      sinon.stub(connection, 'execute').resolves(productsMock);


      await getAll();

    });
  });

  describe('Get product by Id', () => {
    it('should return only one product', async () => {

      sinon.stub(connection, 'execute').resolves([[productByIdMock]]);


      await getById(3)
    });

  });


  describe('Get product by Id', () => {
    it('should return only one product', async () => {

      sinon.stub(connection, 'execute').resolves([1]);


      await insertProduct()
    });

  });

  afterEach(sinon.restore);

});

