const express = require('express');
const request = require('supertest');

const bookRoutes = require('../../routes/book');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/book', bookRoutes);

require('dotenv').config();

/** MONGO CONNECTION */
require('../../mongoDb/connectMongo')();

const bookData = {
  "Title": "Test title",
  "Price": 100,
  "ISBN": "978-3-16-148410-0",
  "Language": "EN",
  "NumberOfPages": 1000,
  "Publisher": "ABC Publisher"
};

let bookId;

describe('testing-server-routes', () => {
  it('POST /book - success', async () => {
    const expectedResponse = {
      success: true,
      message: "Book is created!!",
      data: bookData
    };

    const { body } = await request(app)
      .post('/book')
      .send({
        "title": "Test title",
        "price": 100,
        "isbn": "978-3-16-148410-0",
        "language": "EN",
        "numberOfPages": 1000,
        "publisher": "ABC Publisher"
      })
      .set('Accept', /application\/json/);

    bookId = body.data._id;

    expect(body.data.Title).toEqual(expectedResponse.data.Title);
    expect(body.data.Price).toEqual(expectedResponse.data.Price);
    expect(body.success).toEqual(expectedResponse.success);
  });

  it('PUT /book/:id - success', async () => {

    const expectedResponse = {
      success: true,
      message: "Book is updated!!",
      data: {
        "ID": bookId,
        "Title": "Updated Title",
        "Price": 102,
        "ISBN": "978-3-16-148410-0",
        "Language": "EN",
        "NumberOfPages": 1002,
        "Publisher": "ABC Publisher"
      }
    };

    const { body } = await request(app)
      .put(`/book/${bookId}`)
      .send({
        "title": "Updated Title",
        "price": 102,
        "isbn": "978-3-16-148410-0",
        "language": "EN",
        "numberOfPages": 1000,
        "publisher": "ABC Publisher"
      })
      .set('Accept', /application\/json/);

    expect(body.data.Title).toEqual(expectedResponse.data.Title);
    expect(body.data.Price).toEqual(expectedResponse.data.Price);
    expect(body.data._id.toString()).toEqual(expectedResponse.data.ID);
    expect(body.success).toEqual(expectedResponse.success);
  });

  it('GET /book - success', async () => {
    const expectedResponse = {
      success: true,
      message: "Books are fetched!!",
    };

    const { body } = await request(app)
      .get(`/book`);

    expect(body.success).toEqual(expectedResponse.success);
    expect(body.message).toEqual(expectedResponse.message);
    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "Language": "English"
        })
      ])
    )
  });

  it('DELETE /book/:id - success', async () => {
    const expectedResponse = {
      success: true,
      message: "Book is deleted!!",
      data: null
    };

    const { body } = await request(app)
      .delete(`/book/${bookId}`);

    expect(body).toEqual(expectedResponse);
  });
});