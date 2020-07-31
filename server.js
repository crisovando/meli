const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const getParseItem = data => {
  const [amount, decimals] = data.price.toString().split('.');
  return {
    id: data.id,
    title: data.title,
    price: {
      currency: data.currency_id,
      amount: Number(amount),
      decimals: Number[decimals],
      priceTotal: data.price,
    },
    picture: data.thumbnail,
    condition: data.condition,
    free_shipping: data.shipping.free_shipping,
    sold_quantity: data.sold_quantity,
    state: data.address ? data.address.state_name : null,
  };
};

const parseData = data => {
  const { results, available_filters, filters } = data;
  return {
    author: {
      name: 'Cristian',
      lastName: 'Ovando',
    },
    categories: available_filters
      .concat(filters)
      .find(f => f.id === 'category')
      .values.sort((a, b) => (a.results || 0) - (b.results || 0))
      .map(c => c.name),
    items: results.slice(0, 4).map(getParseItem),
  };
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(function (req, res, next) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return next();
    });

    server.get('/api/items/', async (req, res) => {
      try {
        const response = await fetch(
          `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`,
        );
        const result = await response.json();

        const dataParsed = parseData(result);
        res.send(dataParsed);
      } catch (error) {
        console.log(error);
      }
    });

    server.get('/api/items/:id', async (req, res) => {
      try {
        let response = await fetch(`https://api.mercadolibre.com/items/${req.params.id}`);
        let result = await response.json();

        let responseDesc = await fetch(
          `https://api.mercadolibre.com/items/${req.params.id}/description`,
        );
        let resultDesc = await responseDesc.json();

        const dataParsed = getParseItem(result);
        res.send({
          author: {
            name: 'Cristian',
            lastName: 'Ovando',
          },
          item: {
            ...dataParsed,
            description: resultDesc.plain_text,
            picture: result.pictures[0].url,
          },
        });
      } catch (error) {
        console.log(error);
      }
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    process.exit(1);
  });
