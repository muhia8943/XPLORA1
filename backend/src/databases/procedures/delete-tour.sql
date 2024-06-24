CREATE PROCEDURE spDeleteTour
    @id INT
AS
BEGIN
    DELETE FROM Tours WHERE id = @id;
END;
