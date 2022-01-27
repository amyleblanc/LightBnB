const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = `SELECT * FROM users WHERE email = $1`;
  return pool.query(query, [email])
    .then(res => {
      return res.rows;
    })
    .then(res => {
      const user = res[0];
      return user;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = `SELECT * FROM users WHERE id = $1`;
  return pool.query(query, [id])
    .then(res => {
      return res.rows;
    })
    .then(res => {
      const user = res[0];
      return user;
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return pool.query(query, [user.name, user.email, user.password])
    .then(res => {
      const user = res.rows[0];
      return user;
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = `
  SELECT reservations.*, properties.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY start_date DESC
  LIMIT $2
  `;
  return pool.query(query, [guest_id, limit])
    .then(res => {
      return res.rows;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 *
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    const length = queryParams.length;
    queryString += ` AND city LIKE $${length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    const length = queryParams.length;
    queryString += ` AND owner_id = $${length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    const length = queryParams.length;
    queryString += ` AND cost_per_night >= $${length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    const length = queryParams.length;
    queryString += ` AND cost_per_night <= $${length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`, limit);
    const length = queryParams.length;
    queryString += ` 
    GROUP BY properties.id
    HAVING avg(property_reviews.rating) >= $${length - 1}
    ORDER BY cost_per_night
    `;
  } else {
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    `;
  }

  queryString += `
  LIMIT $${queryParams.length}
  `;

  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams = [property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code, 'TRUE', property.owner_id];
  const queryString = `
  INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, owner_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  RETURNING *;
  `;

  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;
