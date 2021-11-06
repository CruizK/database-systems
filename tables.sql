CREATE TABLE IF NOT EXISTS student (
  sid INT NOT NULL PRIMARY KEY,
  sname VARCHAR(255) NOT NULL,
  major VARCHAR(255) NOT NULL,
  s_level VARCHAR(255) NOT NULL,
  age INT NOT NULL
);

CREATE TABLE IF NOT EXISTS course (
  cid VARCHAR(255) NOT NULL PRIMARY KEY,
  cname VARCHAR(255) NOT NULL,
  meets_at VARCHAR(255) NOT NULL,
  room VARCHAR(255) NOT NULL,
  fid INT NOT NULL,
  capacity INT NOT NULL,
  FOREIGN KEY (fid) REFERENCES faculty(fid)
);

CREATE TABLE IF NOT EXISTS enrolled (
  sid INT NOT NULL,
  cid VARCHAR(255) NOT NULL,
  exam1 INT,
  exam2 INT,
  final INT,
  PRIMARY KEY (sid, cid),
  FOREIGN KEY (sid) REFERENCES student(sid),
  FOREIGN KEY (cid) REFERENCES course(cid)
);


CREATE TABLE IF NOT EXISTS department (
  did INT NOT NULL PRIMARY KEY,
  dname VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS faculty (
  fid INT NOT NULL PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  deptid INT NOT NULL,
  FOREIGN KEY (deptid) REFERENCES department(did)
);

CREATE TABLE IF NOT EXISTS staff (
  sid INT NOT NULL PRIMARY KEY,
  sname VARCHAR(255) NOT NULL,
  deptid INT NOT NULL,
  FOREIGN KEY (deptid) REFERENCES department(did)
);

