CREATE PROCEDURE spUpdateTour
    @id INT,
    @category NVARCHAR(255),
    @tourdescription NVARCHAR(MAX),
    @duration NVARCHAR(255)
AS
BEGIN
    UPDATE Tours
    SET category = @category,
        tourdescription = @tourdescription,
        duration = @duration
    WHERE id = @id;
END;
