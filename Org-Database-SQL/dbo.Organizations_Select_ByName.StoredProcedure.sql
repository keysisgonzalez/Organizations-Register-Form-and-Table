USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Select_ByName]    Script Date: 5/2/2024 4:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Keysis Gonzalez
-- Create date: 4/19/2024 
-- Description: Used to select records from the Organizations table based on the name of the organization.
-- Code Reviewer: Victor Martinez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[Organizations_Select_ByName]
			 @PageIndex int
			,@PageSize int
			,@Name nvarchar(200)

as
/*-------Test-------

DECLARE @PageIndex int = 0
		,@PageSize int = 3
		,@Name nvarchar(200) = 'cafe'

EXECUTE dbo.Organizations_Select_ByName
			@PageIndex
			,@PageSize
			,@Name

*/

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

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
		  ,TotalCount = COUNT(1)OVER()

	  FROM [dbo].[Organizations] as o 
	  inner join dbo.OrganizationTypes as ot
	  on o.OrganizationTypeId = ot.Id
	  inner join dbo.Locations as L
		on L.Id = o.LocationId
		inner join dbo.States as S
		on S.Id = L.StateId

	  WHERE (o.Name LIKE '%' + @Name + '%') 
	  ORDER BY Id
	  OFFSET @Offset ROWS
	  FETCH NEXT @PageSize ROWS ONLY

END
GO
