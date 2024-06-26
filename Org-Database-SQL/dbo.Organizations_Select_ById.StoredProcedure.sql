USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Select_ById]    Script Date: 5/2/2024 4:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Author: Keysis Gonzalez
-- Create date: 4/4/2024 
-- Description: Used to select records from the Organizations table based on the id. 
-- Code Reviewer: Victor Martinez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
CREATE PROC [dbo].[Organizations_Select_ById]
			@Id int
		
as
/*-------Test-------

DECLARE @Id int = 1

EXECUTE dbo.Organizations_Select_ById @Id	

*/

BEGIN

	SELECT o.[Id]
		  ,ot.[Id] as OrganizationTypeId
		  ,ot.[Name] as OrganizationName
		  ,o.[Name]
		  ,[Headline]
		  ,[Description]
		  ,[Logo]
		  ,(select L.Id
						,L.LineOne
						,L.LineTwo
						,L.City
						,L.Zip
						,S.Id as StateId
						,S.[Name] as [State]
				From dbo.Locations as L
				Where L.Id = o.LocationId
				 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) as LocationInfo
		  ,[Phone]
		  ,[SiteUrl]
		  ,dbo.fn_GetUserJSON(o.CreatedBy) as CreatedBy 
		  ,[Active]

	  FROM [dbo].[Organizations] as o 
	  inner join dbo.OrganizationTypes as ot
	  on o.OrganizationTypeId = ot.Id
	  inner join dbo.Locations as L
		on L.Id = o.LocationId
		inner join dbo.States as S
		on S.Id = L.StateId

	  WHERE o.Id = @Id
	

END


GO
