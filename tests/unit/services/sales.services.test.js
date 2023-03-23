const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { getSales, getSalesById, insertSales,deleteSales, httpErrGenerator } = require('../../../src/services/sales')

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
    it('should throw a 404 error if Sale is not found', async () => {
      const getSalesByIdStub = sinon.stub(sales, 'getSalesById').returns(0);
      const id = '8554';


      try {
        await getSalesById(id);
      } catch (err) {
        expect(err).to.eql(httpErrGenerator(404, 'Sale not found'));
      }

      expect(getSalesByIdStub.calledOnceWithExactly(id)).to.be.true;
    });


  });

  describe('Testing Function insertSales', () => {
    it('should return the new inserted sale', async () => {

      sinon.stub(sales, 'insertSales').resolves(mockInsertSales);


      await insertSales();

    });
  });


  describe('Delete sales by Id', () => {
    it('should delete the sales ', async () => {
   

      sinon.stub(sales, 'deleteSales').resolves();

      await deleteSales();

    });
    it('should throw a 404 error if Sale is not found', async () => {
      const deleteSalesStub = sinon.stub(sales, 'deleteSales').returns(0);
      const id = '8554';


      try {
        await deleteSales(id);
      } catch (err) {
        expect(err).to.eql(httpErrGenerator(404, 'Sale not found'));
      }

      expect(deleteSalesStub.calledOnceWithExactly(id)).to.be.true;
    });


  });

  afterEach(sinon.restore);
});
