INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'eva123@imail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mitch Cooney', 'mitchc@imail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominique Smith', 'domsmith345@jmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Earl of Grantham', 'robertcrawley@rmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Julie Reilly', 'julie321@imail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sam White', 'swhite12345@jmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, owner_id)
VALUES ('Downton Abbey', 'Historic property, owned by the Earl of Grantham.', 'https://nypost.com/wp-content/uploads/sites/2/2021/06/Highclere-Castle.jpg?quality=80&strip=all', 'https://nypost.com/wp-content/uploads/sites/2/2021/06/Highclere-Castle.jpg?quality=80&strip=all', 1000000, 10, 7, 16, 'England', 'Main Street', 'Hampshire', 'North Hampshire', 'HC1234', TRUE, 4),
('The Cottage', 'Beautiful cottage, walking distance to the lake.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVLjvUNyxd-MzaAmvMUBv4Uy3M4wi_RRitg&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVLjvUNyxd-MzaAmvMUBv4Uy3M4wi_RRitg&usqp=CAU', 60000, 3, 2, 3, 'Canada', 'Lake Avenue', 'Whistler', 'BC', 'V2O 7V8', TRUE, 5),
('Condo No. 9567', 'Up and coming neighbourhood, city-dump-adjacent', 'https://assets.pando.com/_versions/2013/10/2497825095_3eb570629e_featured.jpg', 'https://assets.pando.com/_versions/2013/10/2497825095_3eb570629e_featured.jpg', 20000, 0, 1, 2, 'Canada', 'Main Street', 'Big Town', 'AC', '1T3 9P7', TRUE, 6);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);


INSERT INTO property_reviews (rating, message, reservation_id, property_id, guest_id)
VALUES (5, 'Great view.', 7, 1, 1),
(4, 'OK view.', 8, 2, 2),
(2, 'Terrible view.', 9, 3, 3);