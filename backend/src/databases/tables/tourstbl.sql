CREATE TABLE tours (
    id INT IDENTITY(1,1) PRIMARY KEY,
    category NVARCHAR(255) NOT NULL,
    tourdescription NVARCHAR(MAX) NOT NULL,
    duration NVARCHAR(MAX) NOT NULL
);
GO