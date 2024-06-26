USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[OrganizationTypes_SelectAll]    Script Date: 5/2/2024 4:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Author: Keysis Gonzalez
-- Create date: 4/4/2024 
-- Description: Used to select/retrieve records from the OrganizationTypes table.
-- Code Reviewer: Victor Martinez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:

CREATE PROC [dbo].[OrganizationTypes_SelectAll]

as
/*
	Execute dbo.OrganizationTypes_SelectAll
*/

BEGIN
SELECT [Id]
      ,[Name]
  FROM [dbo].[OrganizationTypes]

END


GO
