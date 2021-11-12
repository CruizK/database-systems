INSERT INTO student (sid, sname, major, s_level, age)
VALUES 
(1, 'Tom', 'Chemistry', 'Freshmen', 18),
(2, 'Jim', 'Chemistry', 'Freshmen', 19),
(3, 'Emma', 'CS', 'Sophmore', 21),
(4, 'Timithy', 'CS', 'Junior', 21),
(5, 'Burger', 'CS', 'Senior', 21),
(6, 'Pizza', 'Math', 'Senior', 23),
(7, 'Taco', 'Math', 'Senior', 23),
(8, 'Tokyo', 'Math', 'Senior', 23),
(9, 'Warsaw', 'Math', 'Senior', 23),
(10, 'Paris', 'Math', 'Junior', 25);
INSERT INTO department (did, dname)
VALUES 
(1, 'Math'),
(2, 'CS'),
(3, 'Engineering'),
(4, 'Liberal Arts'),
(5, 'Science'),
(6, 'Life Science'),
(7, 'Foreign Science'),
(8, 'Accounting'),
(9, 'Bald'),
(10, 'Lemon');
INSERT INTO staff (sid, sname, deptid)
VALUES 
(1, 'Quebec', 1),
(2, 'Washington', 1),
(3, 'Lima', 4),
(4, 'London', 4),
(5, 'Dublin', 2),
(6, 'Madrid', 2),
(7, 'Lisbon', 6),
(8, 'Berlin', 3),
(9, 'Rome', 7),
(10, 'Brussels', 9);

INSERT INTO faculty (fid, fname, deptid)
VALUES 
(1, 'Amsterdam', 1),
(2, 'Prague', 1),
(3, 'Moscow', 4),
(4, 'Budapest', 4),
(5, 'Bern', 2),
(6, 'Beijing', 2),
(7, 'Seol', 6),
(8, 'Cairo', 3),
(9, 'Copenhagen', 7),
(10, 'Stockholm', 9);

INSERT INTO course (cid, cname, meets_at, room, fid, capacity)
VALUES
('C1', 'Intro to CS', 'Noon', '302', 2, 1),
('C2', 'Intro to Data Structures', '2PM', '202', 1, 30),
('C3', 'Intro to Algorithms', '4PM', '304', 1, 20),
('C4', 'Linux Programming', '9AM', '306', 3, 20),
('LA1', 'Arts & Crafts', '9AM', '322', 3, 100),
('ECON1', 'Intro to Economics', '9AM', '324', 5, 100),
('BIO1', 'Intro to Biology', '9AM', '122', 5, 100),
('MATH1', 'Trigonometry', '9AM', '142', 7, 30),
('MATH2', 'Calculus I', '10AM', '420', 8, 10),
('MATH3', 'Linear Algebra', '10AM', '422', 10, 10);

INSERT INTO enrolled (sid, cid, exam1, exam2, final)
VALUES
(1, 'C1', 100, 100, 100),
(2, 'C2', 50, 75, 80),
(3, 'C3', 100, 75, 80),
(4, 'C4', 101, 95, 94),
(5, 'LA1', 70, 80, 95),
(6, 'ECON1', 50, 50, 100),
(7, 'BIO1', 75, 75, 100),
(8, 'MATH1', 75, 65, 60),
(9, 'MATH1', 45, 10, 50),
(10, 'MATH1', 80, 95, 99);