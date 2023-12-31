const mockGetSales = [
  {
    "saleId": 1,
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const mockGetSaleById = [
  {
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-10-13T21:45:29.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const mockInsertSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  },
  {
    "productId": 3,
    "quantity": 5
  }
]

module.exports = {
  mockGetSales,
  mockGetSaleById,
  mockInsertSales
}