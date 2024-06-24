CREATE PROCEDURE spRegisterUser
    @username NVARCHAR(255),
    @password NVARCHAR(255),
    @role NVARCHAR(50) = 'user',
    @uniqueEmail NVARCHAR(255)
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM Users WHERE email = @uniqueEmail)
    BEGIN
        INSERT INTO Users (username, email, password, role)
        VALUES (@username, @uniqueEmail, @password, @role);
    END
    ELSE
    BEGIN
        THROW 50001, 'Email already exists', 1;
    END
    
END;
