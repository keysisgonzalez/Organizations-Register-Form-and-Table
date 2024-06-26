USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Insert]    Script Date: 5/2/2024 4:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Keysis Gonzalez
-- Create date: 4/4/2024 
-- Description: Used to insert data into the Organizations table.
-- Code Reviewer: Victor Martinez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Organizations_Insert]
			@OrganizationTypeId int
           ,@Name nvarchar(200)
           ,@Headline nvarchar(200)
           ,@Description nvarchar(200)
           ,@Logo nvarchar(255)
           ,@LocationId int
           ,@Phone nvarchar(50)
           ,@SiteUrl nvarchar(255)
           ,@CreatedBy int
		   ,@Active bit
		   ,@Id int OUTPUT

as
/*-------Test------
	Declare @Id int = 3

	Declare @OrganizationTypeId int = 3
           ,@Name nvarchar(200) = 'Torchy's Tacos'
           ,@Headline nvarchar(200) = 'Tacos that Pack a Punch'
           ,@Description nvarchar(200) = 'Tex-Mex eatery known for its creative taco combinations made with fresh, high-quality ingredients, alongside a selection of sides and drinks, in a laid-back environment.'
           ,@Logo nvarchar(255) = 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/fortworth/torchy0_a1163562-5056-a348-3af5fbde8c6a537f.jpg'
           ,@LocationId int = 13
           ,@Phone nvarchar(50) = '(8702)853-9951'
           ,@SiteUrl nvarchar(255) = 'https://torchystacos.com'
           ,@CreatedBy int = 1
		   ,@Active bit = 1
		 
	Execute dbo.Organizations_Insert
		    @OrganizationTypeId 
           ,@Name 
           ,@Headline 
           ,@Description 
           ,@Logo 
           ,@LocationId 
           ,@Phone 
           ,@SiteUrl
           ,@CreatedBy 
		   ,@Active
		   ,@Id 
		  
*/

BEGIN
INSERT INTO [dbo].[Organizations]
           ([OrganizationTypeId]
           ,[Name]
           ,[Headline]
           ,[Description]
           ,[Logo]
           ,[LocationId]
           ,[Phone]
           ,[SiteUrl]
           ,[CreatedBy]
		   ,[Active])
     VALUES
           (@OrganizationTypeId
           ,@Name
           ,@Headline
           ,@Description
           ,@Logo
           ,@LocationId 
           ,@Phone
           ,@SiteUrl
           ,@CreatedBy
		   ,@Active)

		SET @Id = SCOPE_IDENTITY()
END


GO
