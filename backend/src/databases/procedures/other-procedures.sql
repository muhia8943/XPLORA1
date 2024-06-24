CREATE PROCEDURE spGetTourById
    @id INT
AS
BEGIN
    SELECT * FROM Tours WHERE id = @id;
END;

