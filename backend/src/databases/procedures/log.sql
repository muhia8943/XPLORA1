CREATE PROCEDURE LoginUser
    @Email NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Select the user details based on the email
    SELECT 
        Id, 
        Username, 
        Password, 
        Role, 
        Email
    FROM 
        Users
    WHERE 
        Email = @Email;
END
