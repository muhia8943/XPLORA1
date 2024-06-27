CREATE PROCEDURE spDeleteUser
    @id INT
AS
BEGIN
    DELETE FROM Users WHERE id = @id
END
