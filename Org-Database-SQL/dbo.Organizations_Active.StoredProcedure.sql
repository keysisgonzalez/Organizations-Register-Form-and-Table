USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Active]    Script Date: 5/2/2024 4:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Keysis Gonzalez
-- Create date: 4/19/2024 
-- Description: Used to make inactive a record of the organizations table by id.
-- Code Reviewer: Victor Martinez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Organizations_Active]
			@Id int

AS
/*-------Test-------
	Declare @Id int = 4;

	SELECT*
	FROM dbo.[Organizations]
	WHERE Id = @Id

	Execute [dbo].[Organizations_Active] @Id

	SELECT*
	FROM dbo.[Organizations]
	WHERE Id = @Id
*/

BEGIN
    UPDATE [dbo].[Organizations]
    SET Active = 0
    WHERE Id = @Id;
END;
GO
