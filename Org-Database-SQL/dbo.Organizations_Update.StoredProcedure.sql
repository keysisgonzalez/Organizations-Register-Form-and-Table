USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Update]    Script Date: 5/2/2024 4:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Author: Keysis Gonzalez
-- Create date: 4/4/2024 
-- Description: Used used to update data in the Organizations table.
-- Code Reviewer: Victor Martinez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Organizations_Update]
			@OrganizationTypeId int
           ,@Name nvarchar(200)
           ,@Headline nvarchar(200)
           ,@Description nvarchar(200)
           ,@Logo nvarchar(255)
           ,@LocationId int
           ,@Phone nvarchar(50)
           ,@SiteUrl nvarchar(255)
		   ,@Active bit
		   ,@Id int

as
/*-------Test------
	Declare @Id int = 1

	Declare @OrganizationTypeId int = 1
           ,@Name nvarchar(200) = 'Test 1 updated'
           ,@Headline nvarchar(200) = 'Test 1 updated'
           ,@Description nvarchar(200) = 'Test 1 updated'
           ,@Logo nvarchar(255) = 'Logo 1 updated'
           ,@LocationId int = 1
           ,@Phone nvarchar(50) = '1111-1'
           ,@SiteUrl nvarchar(255) = 'url1 updated'
		   ,@Active bit = 0
		 
	Execute dbo.Organizations_Update
		    @OrganizationTypeId 
           ,@Name 
           ,@Headline 
           ,@Description 
           ,@Logo 
           ,@LocationId 
           ,@Phone 
           ,@SiteUrl        
		   ,@Active
		   ,@Id 		   
		   
*/

BEGIN

	UPDATE [dbo].[Organizations]
       SET [OrganizationTypeId] = @OrganizationTypeId
           ,[Name] = @Name
           ,[Headline] = @Headline
           ,[Description] = @Description
           ,[Logo] = @Logo
           ,[LocationId] = @LocationId
           ,[Phone] = @Phone
           ,[SiteUrl] = @SiteUrl
		   ,[Active] = @Active

    WHERE Id = @Id

END


GO
