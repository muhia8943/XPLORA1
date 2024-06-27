CREATE PROCEDURE spLoginUser
@Email NVARCHAR(255)
AS
BEGIN
    SELECT id, username, password, role FROM Users WHERE email = @Email
END



DROP PROCEDURE IF EXISTS spLoginUser;




