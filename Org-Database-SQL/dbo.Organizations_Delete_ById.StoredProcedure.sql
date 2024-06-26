USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Delete_ById]    Script Date: 5/2/2024 4:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Author: Keysis Gonzalez
-- Create date: 4/4/2024 
-- Description: Used to delete data from the Organizations table based on the id.
-- Code Reviewer: Victor Martinez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Organizations_Delete_ById]
			@Id int

as
/*-------Test-------

DECLARE @Id int = 38;		

EXECUTE dbo.Organizations_Delete_ById @Id			

*/

BEGIN

	DELETE FROM [dbo].[Organizations]		 
	WHERE Id = @Id
	

END


GO
