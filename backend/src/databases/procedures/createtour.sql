CREATE PROCEDURE spCreateTour
    @category NVARCHAR(255),
    @tourdescription NVARCHAR(MAX),
    @duration NVARCHAR(255)
AS
BEGIN
    INSERT INTO Tours (category, tourdescription, duration)
    VALUES (@category, @tourdescription, @duration);
END;
